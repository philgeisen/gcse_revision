export const dynamicParams = false;

export const generateStaticParams = () => [{ id: 'mock' }];

import { SessionRunnerClient } from '@/components/session/SessionRunnerClient';

export default function SessionPage() {
  return <SessionRunnerClient />;
}
