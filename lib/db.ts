import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

export const prisma = isBuildPhase ? ({} as PrismaClient) : global.prisma ?? new PrismaClient();

if (!isBuildPhase && process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
