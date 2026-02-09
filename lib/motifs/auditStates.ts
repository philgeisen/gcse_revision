export type AuditState =
  | 'planned'
  | 'running'
  | 'marking'
  | 'lock_in_pending'
  | 'ended_on_win'
  | 'offline_queueing'
  | 'synced'
  | 'evidence-grounded';

export const auditStripeMap: Record<AuditState, string> = {
  planned: 'bg-slate-700',
  running: 'bg-slate-200',
  marking: 'bg-indigo-200',
  lock_in_pending: 'bg-amber-200',
  ended_on_win: 'bg-emerald-200',
  offline_queueing: 'bg-orange-300',
  synced: 'bg-emerald-400',
  'evidence-grounded': 'bg-sky-200'
};
