import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import pdfParse from 'pdf-parse';
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const chunkTextDeterministic = (text: string, maxChars = 4500) => {
  const paragraphs = text.split(/\n\s*\n/).map((para) => para.trim()).filter(Boolean);
  const chunks: { chunkIndex: number; content: string; contentSha256: string }[] = [];
  let buffer: string[] = [];
  let length = 0;

  const pushChunk = () => {
    const content = buffer.join('\n\n').trim();
    if (!content) return;
    const contentSha256 = crypto.createHash('sha256').update(content).digest('hex');
    chunks.push({ chunkIndex: chunks.length, content, contentSha256 });
    buffer = [];
    length = 0;
  };

  paragraphs.forEach((para) => {
    if (length + para.length > maxChars) {
      pushChunk();
    }
    buffer.push(para);
    length += para.length;
  });
  pushChunk();
  return chunks;
};

const run = async () => {
  if (!process.env.ADMIN_IMPORT_TOKEN) {
    throw new Error('Missing ADMIN_IMPORT_TOKEN');
  }
  const packPath = process.argv[2];
  if (!packPath) throw new Error('Pack path required');
  const manifestPath = path.join(packPath, 'manifest.json');
  const manifestRaw = await fs.readFile(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestRaw);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  );

  const contentPack = await prisma.contentPack.upsert({
    where: { name_version: { name: manifest.pack.name, version: manifest.pack.version } },
    update: { description: manifest.pack.description },
    create: {
      name: manifest.pack.name,
      version: manifest.pack.version,
      description: manifest.pack.description
    }
  });

  let imported = 0;
  let skipped = 0;

  for (const doc of manifest.documents) {
    const filePath = path.join(packPath, doc.file);
    const fileBuffer = await fs.readFile(filePath);
    const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const existing = await prisma.document.findUnique({ where: { sha256 } });
    if (existing) {
      skipped += 1;
      continue;
    }

    const storagePath = `packs/${manifest.pack.name}/${manifest.pack.version}/${sha256}.pdf`;
    const bucket = process.env.CONTENT_PACK_BUCKET ?? 'content-packs';
    await supabase.storage.from(bucket).upload(storagePath, fileBuffer, { upsert: false });

    const document = await prisma.document.create({
      data: {
        contentPackId: contentPack.id,
        kind: doc.kind,
        subjectName: doc.subjectName,
        examBoardName: doc.examBoardName,
        tier: doc.tier ?? null,
        title: doc.title,
        storagePath,
        sha256,
        status: 'stored'
      }
    });

    const parsed = await pdfParse(fileBuffer);
    await prisma.document.update({
      where: { id: document.id },
      data: { status: 'parsed', pageCount: parsed.numpages }
    });

    const chunks = chunkTextDeterministic(parsed.text);
    await prisma.documentChunk.createMany({
      data: chunks.map((chunk) => ({
        documentId: document.id,
        chunkIndex: chunk.chunkIndex,
        content: chunk.content,
        contentSha256: chunk.contentSha256
      }))
    });

    await prisma.document.update({
      where: { id: document.id },
      data: { status: 'indexed' }
    });

    imported += 1;
  }

  console.log({ imported, skipped });
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
