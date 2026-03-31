-- Hana v3 マイグレーション: 5軸テスト + 業種対応
-- 既存テーブルに対して実行してください

-- 1. companies テーブルに industry カラム追加
ALTER TABLE companies ADD COLUMN IF NOT EXISTS industry TEXT NOT NULL DEFAULT 'general';

-- 2. test_results テーブルに industry_score カラム追加
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS industry_score INTEGER;

-- 確認用
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'companies';
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'test_results';
