-- Syro-Convention Schedule Builder Database Schema
-- Run this in your Supabase SQL Editor

-- Create attendees table
-- Note: 'age' stores representative ages mapped from age groups:
--   6-12 -> 9
--   13-17 -> 15
--   18-24 -> 21
--   25-45 -> 35
--   46-64 -> 55
--   65+ -> 70
CREATE TABLE IF NOT EXISTS attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0 AND age <= 2001),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create schedule_selections table
CREATE TABLE IF NOT EXISTS schedule_selections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attendee_id UUID NOT NULL REFERENCES attendees(id) ON DELETE CASCADE,
  event_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(attendee_id, event_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_schedule_selections_attendee_id ON schedule_selections(attendee_id);
CREATE INDEX IF NOT EXISTS idx_schedule_selections_event_id ON schedule_selections(event_id);
CREATE INDEX IF NOT EXISTS idx_attendees_created_at ON attendees(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for attendees updated_at
CREATE TRIGGER update_attendees_updated_at
  BEFORE UPDATE ON attendees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_selections ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since we're using anon key)
-- Adjust these policies based on your security requirements

-- Allow anyone to insert attendees
CREATE POLICY "Allow public insert on attendees"
  ON attendees FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read attendees (for analytics)
CREATE POLICY "Allow public read on attendees"
  ON attendees FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to insert schedule selections
CREATE POLICY "Allow public insert on schedule_selections"
  ON schedule_selections FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read schedule selections
CREATE POLICY "Allow public read on schedule_selections"
  ON schedule_selections FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to delete their own schedule selections
CREATE POLICY "Allow public delete on schedule_selections"
  ON schedule_selections FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create a view for popular events (for better performance)
CREATE OR REPLACE VIEW popular_events AS
SELECT 
  event_id,
  COUNT(*) as selection_count
FROM schedule_selections
GROUP BY event_id
ORDER BY selection_count DESC;

-- Grant access to the view
GRANT SELECT ON popular_events TO anon, authenticated;

-- Example queries for data analysis:

-- Most popular events (using view):
-- SELECT * FROM popular_events LIMIT 10;

-- Most popular events (direct query):
-- SELECT event_id, COUNT(*) as selection_count
-- FROM schedule_selections
-- GROUP BY event_id
-- ORDER BY selection_count DESC;

-- Total attendees:
-- SELECT COUNT(*) as total_attendees FROM attendees;

-- Attendees by age group:
-- SELECT 
--   CASE 
--     WHEN age <= 12 THEN '6-12'
--     WHEN age <= 17 THEN '13-17'
--     WHEN age <= 24 THEN '18-24'
--     WHEN age <= 45 THEN '25-45'
--     WHEN age <= 64 THEN '46-64'
--     WHEN age >= 65 THEN '65+'
--   END as age_group,
--   COUNT(*) as count
-- FROM attendees
-- GROUP BY age_group
-- ORDER BY count DESC;

-- Popular events by age group:
-- SELECT 
--   ss.event_id,
--   CASE 
--     WHEN a.age <= 12 THEN '6-12'
--     WHEN a.age <= 17 THEN '13-17'
--     WHEN a.age <= 24 THEN '18-24'
--     WHEN a.age <= 45 THEN '25-45'
--     WHEN a.age <= 64 THEN '46-64'
--     WHEN a.age >= 65 THEN '65+'
--   END as age_group,
--   COUNT(*) as selection_count
-- FROM schedule_selections ss
-- JOIN attendees a ON ss.attendee_id = a.id
-- GROUP BY ss.event_id, age_group
-- ORDER BY ss.event_id, selection_count DESC;

