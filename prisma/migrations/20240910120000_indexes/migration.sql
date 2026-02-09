CREATE INDEX IF NOT EXISTS document_chunk_fts_idx ON "DocumentChunk"
USING GIN (to_tsvector('english', "content"));

CREATE INDEX IF NOT EXISTS attempt_user_created_idx ON "Attempt" ("userId", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS flashcard_due_idx ON "Flashcard" ("userId", "dueAt");
CREATE INDEX IF NOT EXISTS specpoint_mastery_idx ON "SpecPointMasteryState" ("userId", "masteryScore", "lastSeenAt");
CREATE INDEX IF NOT EXISTS topic_mastery_idx ON "TopicMasteryState" ("userId", "masteryScore", "lastSeenAt");
CREATE INDEX IF NOT EXISTS practice_test_user_idx ON "PracticeTest" ("userId", "createdAt");
