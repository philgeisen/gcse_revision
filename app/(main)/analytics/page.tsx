import { CalibrationDot } from '@/components/motifs/CalibrationDot';
import { Card } from '@/components/ui/Card';

export default function AnalyticsPage() {
  return (
    <main className="space-y-6">
      <Card title="Content & Coverage">
        <div className="space-y-2 text-sm text-subtext">
          <p>GCSE Core Pack • v1</p>
          <p>Maths / Edexcel — Spec ✅ • Mark schemes ❌ • Notes ❌</p>
        </div>
      </Card>
      <Card title="Confidence Calibration">
        <CalibrationDot points={[{ x: 0.2, y: 0.8 }, { x: 0.7, y: 0.6 }]} />
      </Card>
    </main>
  );
}
