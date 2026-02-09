import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const dateParam = request.nextUrl.searchParams.get('date');
  if (!dateParam) return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  const date = new Date(dateParam);
  date.setHours(0, 0, 0, 0);
  const sessionPlan = await prisma.sessionPlan.findUnique({
    where: { userId_plannedFor: { userId, plannedFor: date } }
  });
  return NextResponse.json({ sessionPlan });
}
