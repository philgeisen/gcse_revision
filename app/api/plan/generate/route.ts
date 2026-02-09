import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const rangeDays = body.rangeDays ?? 21;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let created = 0;

  for (let i = 0; i < rangeDays; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const existing = await prisma.sessionPlan.findUnique({
      where: { userId_plannedFor: { userId, plannedFor: date } }
    });
    if (existing) continue;
    await prisma.sessionPlan.create({
      data: {
        userId,
        plannedFor: date,
        status: 'planned',
        expectedDurationMin: 45,
        whyThisToday: 'Exam proximity + mastery risk',
        sessionJson: { schema_version: 1, steps: [] }
      }
    });
    created += 1;
  }

  return NextResponse.json({ created, rangeDays });
}
