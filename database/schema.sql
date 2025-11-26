-- Syro-Convention Schedule Builder Database Schema
-- Run this in your Supabase SQL Editor

-- Create attendees table
-- Note: 'age' stores representative ages mapped from age groups:
--   Youth (<18) -> 15
--   Young Adults (18-25) -> 22
--   Adults (26-69) -> 33
--   Seniors (70+) -> 75
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
--     WHEN age < 18 THEN 'Youth'
--     WHEN age BETWEEN 18 AND 25 THEN 'Young Adults'
--     WHEN age BETWEEN 26 AND 69 THEN 'Adults'
--     WHEN age >= 70 THEN 'Seniors'
--   END as age_group,
--   COUNT(*) as count
-- FROM attendees
-- GROUP BY age_group
-- ORDER BY count DESC;

-- Popular events by age group:
-- SELECT 
--   ss.event_id,
--   CASE 
--     WHEN a.age < 18 THEN 'Youth'
--     WHEN a.age BETWEEN 18 AND 25 THEN 'Young Adults'
--     WHEN a.age BETWEEN 26 AND 69 THEN 'Adults'
--     WHEN a.age >= 70 THEN 'Seniors'
--   END as age_group,
--   COUNT(*) as selection_count
-- FROM schedule_selections ss
-- JOIN attendees a ON ss.attendee_id = a.id
-- GROUP BY ss.event_id, age_group
-- ORDER BY ss.event_id, selection_count DESC;

