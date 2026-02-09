import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sessionPlanId = request.nextUrl.searchParams.get('sessionPlanId');
  if (!sessionPlanId) return NextResponse.json({ error: 'Missing sessionPlanId' }, { status: 400 });
  const events = await prisma.sessionTapeEvent.findMany({
    where: { userId, sessionPlanId },
    orderBy: { ts: 'asc' }
  });
  return NextResponse.json({ events });
}
