<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SyroCon 2026 Schedule Builder

A schedule builder application for the Syro-Malabar Convention 2026. Attendees can browse events, build their personal schedule, and track their selections.

## Features

- 🔐 Simple authentication (name + age)
- 📅 Browse 60+ events across 4 days
- ✅ Build and save personal schedule
- ⚠️ Conflict detection for overlapping events
- 📊 Data analytics and insights (popular events, demographics)
- 💾 Cloud storage with Supabase

## Setup

### Prerequisites

- Node.js (v20+ recommended)
- A Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jkuncheria/syro-convention-schedule-builder.git
   cd syro-convention-schedule-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to your project's SQL Editor and run the schema from `database/schema.sql`
   
   c. Get your project credentials:
      - Go to Project Settings → API
      - Copy your Project URL and anon/public key
   
   d. Create a `.env` file in the root directory:
      ```bash
      cp .env.example .env
      ```
   
   e. Add your Supabase credentials to `.env`:
      ```
      VITE_SUPABASE_URL=your_project_url_here
      VITE_SUPABASE_ANON_KEY=your_anon_key_here
      ```

4. **Run the app**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Database Structure

### Tables

- **`attendees`**: Stores attendee information (name, age)
- **`schedule_selections`**: Stores which events each attendee selected

### Analytics Queries

The app includes analytics utilities in `lib/analytics.ts`:

- `getPopularEvents()` - Most selected events
- `getTotalAttendees()` - Total registration count
- `getAttendeesByAgeGroup()` - Demographics breakdown
- `getPopularEventsByAgeGroup()` - Event popularity by age group
- `getRegistrationTrend()` - Daily registration trends

You can also run custom SQL queries in Supabase's SQL Editor. See `database/schema.sql` for example queries.

## Project Structure

```
├── components/          # React components
├── context/            # React contexts (Auth, Schedule)
├── database/           # Database schema and migrations
├── lib/                # Utilities (Supabase client, analytics)
├── pages/              # Page components
├── utils/              # Helper functions
└── constants.ts        # Event data
```

## Tech Stack

- React 19 + TypeScript
- Vite
- Supabase (PostgreSQL)
- React Router
- Tailwind CSS
- Lucide Icons

## License

MIT
