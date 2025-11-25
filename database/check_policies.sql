-- Check if RLS policies exist
-- Run this in Supabase SQL Editor to verify your policies

-- Check attendees policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'attendees';

-- Check schedule_selections policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'schedule_selections';

-- If policies are missing, run this to recreate them:
-- (Only run if the above queries show no policies)

-- Drop existing policies if they exist (optional - only if recreating)
-- DROP POLICY IF EXISTS "Allow public insert on attendees" ON attendees;
-- DROP POLICY IF EXISTS "Allow public read on attendees" ON attendees;
-- DROP POLICY IF EXISTS "Allow public insert on schedule_selections" ON schedule_selections;
-- DROP POLICY IF EXISTS "Allow public read on schedule_selections" ON schedule_selections;
-- DROP POLICY IF EXISTS "Allow public delete on schedule_selections" ON schedule_selections;

-- Recreate policies
-- CREATE POLICY "Allow public insert on attendees"
--   ON attendees FOR INSERT
--   TO anon, authenticated
--   WITH CHECK (true);
--
-- CREATE POLICY "Allow public read on attendees"
--   ON attendees FOR SELECT
--   TO anon, authenticated
--   USING (true);
--
-- CREATE POLICY "Allow public insert on schedule_selections"
--   ON schedule_selections FOR INSERT
--   TO anon, authenticated
--   WITH CHECK (true);
--
-- CREATE POLICY "Allow public read on schedule_selections"
--   ON schedule_selections FOR SELECT
--   TO anon, authenticated
--   USING (true);
--
-- CREATE POLICY "Allow public delete on schedule_selections"
--   ON schedule_selections FOR DELETE
--   TO anon, authenticated
--   USING (true);

