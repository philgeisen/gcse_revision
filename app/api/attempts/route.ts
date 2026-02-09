import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const attempt = await prisma.attempt.create({
    data: {
      userId,
      questionId: body.questionId,
      answerText: body.answerText ?? null,
      confidence: body.confidence ?? null
    }
  });
  return NextResponse.json({ attempt });
}

export async function PATCH(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const attempt = await prisma.attempt.update({
    where: { id: body.attemptId, userId },
    data: { answerText: body.answerText ?? null, confidence: body.confidence ?? null }
  });
  return NextResponse.json({ attempt });
}
