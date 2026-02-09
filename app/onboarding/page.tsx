'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

type SubjectForm = {
  subjectName: string;
  examBoardName: string;
  tier?: string;
};

type ExamForm = {
  subjectName: string;
  examName: string;
  startAt: string;
  durationMin?: number;
};

const boards = ['AQA', 'Edexcel', 'OCR', 'WJEC', 'CCEA', 'Other'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [subjects, setSubjects] = useState<SubjectForm[]>([]);
  const [exams, setExams] = useState<ExamForm[]>([]);

  const addSubject = () => setSubjects((prev) => [...prev, { subjectName: '', examBoardName: boards[0] }]);

  const saveSubjects = async () => {
    await fetch('/api/user/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjects })
    });
    setStep(2);
  };

  const saveExams = async () => {
    await fetch('/api/user/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exams })
    });
    await fetch('/api/bootstrap', { method: 'POST' });
    router.push('/today');
  };

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-xl font-semibold">Onboarding</h1>
        {step === 1 && (
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="rounded-xl border border-stroke p-4">
                <input
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2"
                  placeholder="Subject"
                  value={subject.subjectName}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSubjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, subjectName: value } : item)));
                  }}
                />
                <div className="mt-3 flex gap-2">
                  <select
                    className="rounded border border-stroke bg-transparent px-3 py-2"
                    value={subject.examBoardName}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSubjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, examBoardName: value } : item)));
                    }}
                  >
                    {boards.map((board) => (
                      <option key={board} value={board}>
                        {board}
                      </option>
                    ))}
                  </select>
                  <input
                    className="rounded border border-stroke bg-transparent px-3 py-2"
                    placeholder="Tier (optional)"
                    value={subject.tier ?? ''}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSubjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, tier: value } : item)));
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-3">
              <Button type="button" onClick={addSubject}>
                Add subject
              </Button>
              <Button type="button" onClick={saveSubjects}>
                Save subjects
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-stroke p-4">
              <p className="text-sm text-subtext">Add exam dates</p>
              {exams.map((exam, index) => (
                <div key={index} className="mt-4 grid gap-2 md:grid-cols-4">
                  <input
                    className="rounded border border-stroke bg-transparent px-3 py-2"
                    placeholder="Subject"
                    value={exam.subjectName}
                    onChange={(event) => {
                      const value = event.target.value;
                      setExams((prev) => prev.map((item, idx) => (idx === index ? { ...item, subjectName: value } : item)));
                    }}
                  />
                  <input
                    className="rounded border border-stroke bg-transparent px-3 py-2"
                    placeholder="Exam name"
                    value={exam.examName}
                    onChange={(event) => {
                      const value = event.target.value;
                      setExams((prev) => prev.map((item, idx) => (idx === index ? { ...item, examName: value } : item)));
                    }}
                  />
                  <input
                    className="rounded border border-stroke bg-transparent px-3 py-2"
                    type="datetime-local"
                    value={exam.startAt}
                    onChange={(event) => {
                      const value = event.target.value;
                      setExams((prev) => prev.map((item, idx) => (idx === index ? { ...item, startAt: value } : item)));
                    }}
                  />
                  <input
                    className="rounded border border-stroke bg-transparent px-3 py-2"
                    type="number"
                    placeholder="Duration (min)"
                    value={exam.durationMin ?? ''}
                    onChange={(event) => {
                      const value = event.target.value;
                      setExams((prev) => prev.map((item, idx) => (idx === index ? { ...item, durationMin: Number(value) } : item)));
                    }}
                  />
                </div>
              ))}
              <Button type="button" className="mt-3" onClick={() => setExams((prev) => [...prev, { subjectName: '', examName: '', startAt: '' }])}>
                Add exam
              </Button>
            </div>
            <Button type="button" onClick={saveExams}>
              Save exams
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
