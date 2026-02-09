import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const subjects: { subjectName: string; examBoardName: string; tier?: string }[] = body.subjects ?? [];

  const boards = await prisma.examBoard.findMany();

  await prisma.userSubject.deleteMany({ where: { userId } });

  for (const subject of subjects) {
    const board = boards.find((item: { name: string }) => item.name === subject.examBoardName);
    if (!board) continue;
    await prisma.userSubject.create({
      data: {
        userId,
        subjectName: subject.subjectName,
        examBoardId: board.id,
        tier: subject.tier || null
      }
    });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const subjects = await prisma.userSubject.findMany({ where: { userId }, include: { examBoard: true } });
  return NextResponse.json({ subjects });
}
