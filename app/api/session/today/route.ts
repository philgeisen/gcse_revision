import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';
import { buildMockSession } from '@/lib/mock/mockSession';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await prisma.userProfile.findUnique({ where: { userId } });
  if (!profile?.onboardingCompleted) {
    return NextResponse.json({ error: 'Onboarding required' }, { status: 400 });
  }

  const upcoming = await prisma.examEvent.findFirst({
    where: { userId, startAt: { gte: new Date() } },
    orderBy: { startAt: 'asc' }
  });

  if (!upcoming) {
    return NextResponse.json({ error: 'No exams' }, { status: 400 });
  }

  let question = await prisma.questionBankItem.findFirst({ where: { userId, subjectName: { contains: '' } } });
  if (!question) {
    question = await prisma.questionBankItem.create({
      data: {
        userId,
        subjectName: 'General',
        prompt: 'Solve 2x + 5 = 15',
        marks: 3,
        difficulty: 2,
        qtype: 'short'
      }
    });
    await prisma.markPoint.createMany({
      data: [
        { questionId: question.id, pointText: 'Subtract 5', pointValue: 1 },
        { questionId: question.id, pointText: 'Divide by 2', pointValue: 1 },
        { questionId: question.id, pointText: 'Final answer', pointValue: 1 }
      ]
    });
  }

  const sessionJson = buildMockSession({ examEvent: upcoming, question });
  const plannedFor = new Date();
  plannedFor.setHours(0, 0, 0, 0);

  const sessionPlan = await prisma.sessionPlan.upsert({
    where: { userId_plannedFor: { userId, plannedFor } },
    update: { sessionJson },
    create: {
      userId,
      plannedFor,
      status: 'planned',
      expectedDurationMin: 45,
      whyThisToday: 'Exam proximity + decay risk',
      sessionJson
    }
  });

  return NextResponse.json({ sessionPlan });
}
