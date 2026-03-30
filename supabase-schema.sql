-- Hana App Database Schema
-- Run this in Supabase SQL Editor

-- 1. Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  admin_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_companies_code ON companies(company_code);

-- 2. Test results table
CREATE TABLE test_results (
  id TEXT PRIMARY KEY,
  candidate_name TEXT NOT NULL DEFAULT '',
  company_code TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'ja',
  answers JSONB NOT NULL DEFAULT '{}',
  scores JSONB NOT NULL DEFAULT '{}',
  reference_answers JSONB NOT NULL DEFAULT '{}',
  ai_comment JSONB,
  completed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_results_company ON test_results(company_code);
CREATE INDEX idx_results_completed ON test_results(completed_at DESC);

-- 3. Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for companies
CREATE POLICY "Admins can view own company"
  ON companies FOR SELECT
  TO authenticated
  USING (admin_user_id = auth.uid());

CREATE POLICY "Anyone can check company exists"
  ON companies FOR SELECT
  TO anon
  USING (true);

-- 5. RLS Policies for test_results
CREATE POLICY "Anyone can insert test results"
  ON test_results FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view own company results"
  ON test_results FOR SELECT
  TO authenticated
  USING (
    company_code IN (
      SELECT company_code FROM companies WHERE admin_user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view by direct ID"
  ON test_results FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Service can update results"
  ON test_results FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
