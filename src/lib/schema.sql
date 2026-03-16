-- Spiritual Gifts Assessment — Database Schema

CREATE TABLE IF NOT EXISTS sg_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  internal_name TEXT NOT NULL,
  public_name TEXT NOT NULL,
  description TEXT,
  strengths TEXT,
  cautions TEXT,
  ministry_fit TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sg_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES sg_categories(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sg_questions_category ON sg_questions(category_id);

CREATE TABLE IF NOT EXISTS sg_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name TEXT,
  participant_email TEXT,
  church_name TEXT,
  group_name TEXT,
  status TEXT NOT NULL DEFAULT 'started' CHECK (status IN ('started', 'submitted', 'abandoned')),
  current_page INTEGER NOT NULL DEFAULT 0,
  -- Trellis integration fields
  callback_url TEXT,
  callback_token TEXT,
  external_id TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS sg_session_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sg_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES sg_questions(id),
  category_id UUID NOT NULL REFERENCES sg_categories(id),
  display_order INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sg_session_questions_session ON sg_session_questions(session_id);

CREATE TABLE IF NOT EXISTS sg_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sg_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES sg_questions(id),
  response_value INTEGER NOT NULL CHECK (response_value >= 1 AND response_value <= 5),
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(session_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_sg_responses_session ON sg_responses(session_id);

CREATE TABLE IF NOT EXISTS sg_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sg_sessions(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES sg_categories(id),
  raw_score INTEGER NOT NULL,
  average_score NUMERIC(4,2) NOT NULL,
  rank INTEGER NOT NULL,
  UNIQUE(session_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_sg_scores_session ON sg_scores(session_id);
