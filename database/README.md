# Database Setup Guide

## Quick Start

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the schema**:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `schema.sql`
   - Click "Run" to execute

3. **Get your credentials**:
   - Go to Project Settings → API
   - Copy your Project URL and anon/public key
   - Add them to your `.env` file

## Database Structure

### Tables

#### `attendees`
Stores basic attendee information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Attendee name |
| `age` | INTEGER | Attendee age (1-120) |
| `created_at` | TIMESTAMP | Registration timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

#### `schedule_selections`
Stores which events each attendee selected.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `attendee_id` | UUID | Foreign key to `attendees.id` |
| `event_id` | TEXT | Event ID from constants |
| `created_at` | TIMESTAMP | Selection timestamp |

**Unique constraint**: `(attendee_id, event_id)` - prevents duplicate selections

### Views

#### `popular_events`
Pre-computed view for quick access to event popularity.

| Column | Type | Description |
|--------|------|-------------|
| `event_id` | TEXT | Event ID |
| `selection_count` | BIGINT | Number of times selected |

## Analytics Queries

### Most Popular Events
```sql
SELECT * FROM popular_events LIMIT 10;
```

### Total Attendees
```sql
SELECT COUNT(*) as total_attendees FROM attendees;
```

### Attendees by Age Group
```sql
SELECT 
  CASE 
    WHEN age < 18 THEN 'Youth (<18)'
    WHEN age BETWEEN 18 AND 25 THEN 'Young Adults (18-25)'
    WHEN age BETWEEN 26 AND 69 THEN 'Adults (26-69)'
    WHEN age >= 70 THEN 'Seniors (70+)'
  END as age_group,
  COUNT(*) as count
FROM attendees
GROUP BY age_group
ORDER BY count DESC;
```

### Popular Events by Age Group
```sql
SELECT 
  ss.event_id,
  CASE 
    WHEN a.age < 18 THEN 'Youth (<18)'
    WHEN a.age BETWEEN 18 AND 25 THEN 'Young Adults (18-25)'
    WHEN a.age BETWEEN 26 AND 69 THEN 'Adults (26-69)'
    WHEN a.age >= 70 THEN 'Seniors (70+)'
  END as age_group,
  COUNT(*) as selection_count
FROM schedule_selections ss
JOIN attendees a ON ss.attendee_id = a.id
GROUP BY ss.event_id, age_group
ORDER BY ss.event_id, selection_count DESC;
```

### Registration Trend (Daily)
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as registrations
FROM attendees
GROUP BY DATE(created_at)
ORDER BY date;
```

### Average Events Selected per Attendee
```sql
SELECT 
  AVG(event_count) as avg_events_per_attendee
FROM (
  SELECT 
    attendee_id,
    COUNT(*) as event_count
  FROM schedule_selections
  GROUP BY attendee_id
) subquery;
```

### Events with No Selections
```sql
-- First, get all event IDs from your constants
-- Then find which ones have no selections:
SELECT event_id 
FROM (VALUES 
  ('th-01'), ('th-02'), ('th-03'), -- ... add all event IDs
  -- Or use a table/view with all events
) AS all_events(event_id)
WHERE event_id NOT IN (
  SELECT DISTINCT event_id FROM schedule_selections
);
```

## Using Analytics in Code

The app includes analytics utilities in `lib/analytics.ts`:

```typescript
import { 
  getPopularEvents, 
  getTotalAttendees,
  getAttendeesByAgeGroup,
  getPopularEventsByAgeGroup,
  getRegistrationTrend
} from '../lib/analytics';

// Get top 10 popular events
const popularEvents = await getPopularEvents(10);

// Get total attendees
const total = await getTotalAttendees();

// Get demographics
const demographics = await getAttendeesByAgeGroup();
```

## Security

The database uses Row Level Security (RLS) with public read/write policies for anonymous users. This is suitable for a convention app where anyone can register and select events.

For production, consider:
- Adding rate limiting
- Implementing stricter RLS policies
- Adding authentication for admin analytics
- Using service role key for admin operations (never expose in client)

## Performance Tips

1. **Use the `popular_events` view** instead of counting on-the-fly
2. **Add indexes** for frequently queried columns (already included in schema)
3. **Use pagination** for large result sets
4. **Consider materialized views** for complex analytics queries

## Backup

Supabase automatically backs up your database. You can also:
- Export data via Supabase dashboard
- Use `pg_dump` for manual backups
- Set up automated backups in project settings

