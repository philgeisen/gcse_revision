import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const exams: {
    subjectName: string;
    examName: string;
    startAt: string;
    durationMin?: number;
  }[] = body.exams ?? [];
  const exams = body.exams ?? [];

  const subjects = await prisma.userSubject.findMany({ where: { userId } });
  await prisma.examEvent.deleteMany({ where: { userId } });

  for (const exam of exams) {
    const subject = subjects.find((item: { subjectName: string }) => item.subjectName === exam.subjectName);
    const subject = subjects.find((item) => item.subjectName === exam.subjectName);
    if (!subject) continue;
    await prisma.examEvent.create({
      data: {
        userId,
        userSubjectId: subject.id,
        examName: exam.examName,
        startAt: new Date(exam.startAt),
        durationMin: exam.durationMin ? Number(exam.durationMin) : null
      }
    });
  }

  await prisma.userProfile.update({ where: { userId }, data: { onboardingCompleted: true } });

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const exams = await prisma.examEvent.findMany({ where: { userId } });
  return NextResponse.json({ exams });
}
