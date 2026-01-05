ALTER TABLE submissions ADD COLUMN read_at TEXT;
ALTER TABLE submissions ADD COLUMN deleted_at TEXT;

CREATE INDEX IF NOT EXISTS idx_submissions_deleted_at ON submissions(deleted_at);
CREATE INDEX IF NOT EXISTS idx_submissions_read_at ON submissions(read_at);
