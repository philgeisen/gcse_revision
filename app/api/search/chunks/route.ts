import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const query = body.query ?? '';
  const limit = body.limit ?? 5;

  if (!query) return NextResponse.json({ chunks: [] });

  try {
    const rows = (await prisma.$queryRawUnsafe(
      `SELECT "id", "documentId", "content" FROM "DocumentChunk" WHERE to_tsvector('english', "content") @@ plainto_tsquery('english', $1) LIMIT $2`,
      query,
      limit
    )) as { id: string; documentId: string; content: string }[];
    const rows = await prisma.$queryRawUnsafe<
      { id: string; documentId: string; content: string }[]
    >(
      `SELECT "id", "documentId", "content" FROM "DocumentChunk" WHERE to_tsvector('english', "content") @@ plainto_tsquery('english', $1) LIMIT $2`,
      query,
      limit
    );
    return NextResponse.json({ chunks: rows });
  } catch (error) {
    const rows = await prisma.documentChunk.findMany({
      where: { content: { contains: query } },
      take: limit
    });
    return NextResponse.json({ chunks: rows });
  }
}
