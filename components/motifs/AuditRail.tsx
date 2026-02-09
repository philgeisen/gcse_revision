import { AuditState, auditStripeMap } from '@/lib/motifs/auditStates';
import { tokens } from '@/lib/design/tokens';

export const AuditRail = ({
  states,
  accentColor
}: {
  states: AuditState[];
  accentColor?: string;
}) => {
  return (
    <div
      aria-label="Audit rail"
      className="flex h-full w-2 flex-col gap-1 rounded-full bg-stroke/30 p-1"
      style={{ borderWidth: tokens.railStroke, borderColor: '#232A3A' }}
    >
      {states.map((state, index) => (
        <div
          key={`${state}-${index}`}
          className={`h-full flex-1 rounded-full ${auditStripeMap[state]} transition-opacity`}
          style={{
            borderLeft: accentColor ? `2px solid ${accentColor}` : undefined,
            transitionDuration: tokens.motion.fast,
            transitionTimingFunction: tokens.motion.easing
          }}
        />
      ))}
    </div>
  );
};
