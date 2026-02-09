import { ExamEvent, QuestionBankItem } from '@prisma/client';

export const buildMockSession = ({
  examEvent,
  question
}: {
  examEvent: ExamEvent;
  question: QuestionBankItem;
}) => {
  return {
    schema_version: 1,
    focus: {
      subjectName: question.subjectName,
      topicLabel: question.topicLabel ?? 'Core skills',
      examName: examEvent.examName,
      examDateISO: examEvent.startAt.toISOString()
    },
    steps: [
      {
        step: 1,
        name: 'Orientation',
        bullets: [
          'Re-state the goal in one line.',
          'Identify the formula or method you will use.',
          'List the units or constraints.'
        ]
      },
      {
        step: 2,
        name: 'GuidedExamples',
        example: 'Worked example placeholder: annotate each move.'
      },
      {
        step: 3,
        name: 'ImmediateApplication',
        questionIds: [question.id]
      },
      {
        step: 4,
        name: 'FeedbackLoop',
        marking_mode: 'mark_points_strict'
      },
      {
        step: 5,
        name: 'ConfidenceLockIn',
        wins: 3
      }
    ]
  };
};
