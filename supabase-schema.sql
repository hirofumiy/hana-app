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

-- ============================================
-- 多言語通知配信 (Multi-language Notifications)
-- ============================================

-- 6. Staff members
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_native TEXT,
  language TEXT NOT NULL DEFAULT 'vi',
  email TEXT,
  phone TEXT,
  line_user_id TEXT,
  line_display_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_staff_company ON staff(company_id);
CREATE INDEX idx_staff_line ON staff(line_user_id);

-- 7. Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  category TEXT NOT NULL DEFAULT 'general',
  subject_ja TEXT NOT NULL,
  body_ja TEXT NOT NULL,
  translations JSONB DEFAULT '{}',
  translation_status TEXT DEFAULT 'pending',
  delivery_channels TEXT[] DEFAULT '{email}',
  target_staff_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notifications_company ON notifications(company_id);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- 8. Delivery tracking per staff
CREATE TABLE notification_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  error_message TEXT,
  UNIQUE(notification_id, staff_id, channel)
);

CREATE INDEX idx_deliveries_notification ON notification_deliveries(notification_id);

-- 9. Daily reports from staff
CREATE TABLE daily_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  staff_id UUID NOT NULL REFERENCES staff(id),
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  body_original TEXT NOT NULL,
  language TEXT NOT NULL,
  body_ja TEXT,
  translation_status TEXT DEFAULT 'pending',
  source TEXT DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(staff_id, report_date)
);

CREATE INDEX idx_reports_company_date ON daily_reports(company_id, report_date DESC);

-- 10. RLS for new tables
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage own staff"
  ON staff FOR ALL
  TO authenticated
  USING (company_id IN (SELECT id FROM companies WHERE admin_user_id = auth.uid()))
  WITH CHECK (company_id IN (SELECT id FROM companies WHERE admin_user_id = auth.uid()));

CREATE POLICY "Admins can manage own notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (company_id IN (SELECT id FROM companies WHERE admin_user_id = auth.uid()))
  WITH CHECK (company_id IN (SELECT id FROM companies WHERE admin_user_id = auth.uid()));

CREATE POLICY "Admins can view own deliveries"
  ON notification_deliveries FOR SELECT
  TO authenticated
  USING (notification_id IN (SELECT id FROM notifications WHERE company_id IN (SELECT id FROM companies WHERE admin_user_id = auth.uid())));

CREATE POLICY "Admins can view own reports"
  ON daily_reports FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT id FROM companies WHERE admin_user_id = auth.uid()));

CREATE POLICY "Service can insert deliveries"
  ON notification_deliveries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Service can insert reports"
  ON daily_reports FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
