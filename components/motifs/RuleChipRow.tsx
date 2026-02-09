import { tokens } from '@/lib/design/tokens';

type RuleState = 'inactive' | 'active' | 'triggered' | 'blocked';

type RuleChip = {
  label: string;
  state: RuleState;
  details: string;
};

export const RuleChipRow = ({ rules }: { rules: RuleChip[] }) => {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Rule chip row">
      {rules.map((rule) => (
        <button
          key={rule.label}
          type="button"
          className="rounded-full border border-stroke px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
          style={{
            color: tokens.chipStates[rule.state],
            borderColor: tokens.chipStates[rule.state]
          }}
          aria-label={`${rule.label}: ${rule.state}`}
          title={rule.details}
        >
          {rule.label}
        </button>
      ))}
    </div>
  );
};
