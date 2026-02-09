import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const capture = await prisma.handwritingCapture.create({
    data: {
      attemptId: body.attemptId,
      strokesJson: body.strokesJson
    }
  });
  return NextResponse.json({ capture });
}
