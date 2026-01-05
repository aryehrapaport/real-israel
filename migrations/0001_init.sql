CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  source TEXT NOT NULL,
  subject TEXT,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  timeline TEXT,
  message TEXT,
  page_path TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at
ON submissions(created_at);

CREATE INDEX IF NOT EXISTS idx_submissions_source
ON submissions(source);
