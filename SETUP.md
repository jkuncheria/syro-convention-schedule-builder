# Setup Troubleshooting Guide

## Common Errors and Solutions

### Error: 406/400 when creating attendee

This usually means:
1. **Database tables don't exist** - You need to run the schema.sql file
2. **RLS policies aren't set up** - The schema.sql includes RLS policies

### Quick Fix Steps

1. **Go to your Supabase Dashboard**
   - Navigate to SQL Editor
   - Click "New Query"

2. **Run the schema**
   - Copy the entire contents of `database/schema.sql`
   - Paste into the SQL Editor
   - Click "Run" (or press Cmd/Ctrl + Enter)

3. **Verify tables exist**
   - Go to Table Editor
   - You should see `attendees` and `schedule_selections` tables

4. **Check RLS policies**
   - Go to Authentication → Policies
   - You should see policies for both tables allowing public access

### Verify Your .env File

Make sure your `.env` file has:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** 
- Restart your dev server after changing .env
- The URL should NOT have a trailing slash
- Use the `anon` key, NOT the `service_role` key

### Test Connection

You can test if Supabase is connected by checking the browser console. If you see connection errors, verify:
1. Your Supabase project is active
2. Your API keys are correct
3. Your project URL is correct

### Still Having Issues?

1. Check browser console for detailed error messages
2. Verify your Supabase project is not paused (free tier projects pause after inactivity)
3. Make sure you're using the correct project (check the URL matches)

