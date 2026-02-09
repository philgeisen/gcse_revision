import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

const boards = ['AQA', 'Edexcel', 'OCR', 'WJEC', 'CCEA', 'Other'];

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.userProfile.upsert({
    where: { userId },
    update: {},
    create: { userId, timezone: process.env.APP_TIMEZONE ?? 'Europe/London', displayName: '', onboardingCompleted: false, diagnosticCompleted: false }
  });

  for (const name of boards) {
    await prisma.examBoard.upsert({ where: { name }, update: {}, create: { name } });
  }

  return NextResponse.json({ ok: true });
}
