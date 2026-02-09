import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const event = await prisma.sessionTapeEvent.upsert({
    where: { externalId: body.externalId },
    update: {},
    create: {
      userId,
      sessionPlanId: body.sessionPlanId,
      ts: new Date(body.ts),
      type: body.type,
      meta: body.meta,
      externalId: body.externalId
    }
  });
  return NextResponse.json({ event });
}
