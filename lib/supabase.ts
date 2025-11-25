import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables.');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Validate URL format
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.error('Invalid Supabase URL format:', supabaseUrl);
  throw new Error('Invalid Supabase URL format. URL should start with http:// or https://');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We're handling auth ourselves
  },
  db: {
    schema: 'public',
  },
});

// Test connection on import (in development)
if (import.meta.env.DEV) {
  supabase
    .from('attendees')
    .select('count')
    .limit(0)
    .then(({ error }) => {
      if (error) {
        console.warn('Supabase connection test failed:', error);
        console.warn('This might be normal if tables don\'t exist yet or RLS policies need setup.');
      } else {
        console.log('✓ Supabase connection successful');
      }
    })
    .catch((err) => {
      console.warn('Supabase connection error:', err);
    });
}

// Database types
export interface Attendee {
  id: string;
  name: string;
  age: number;
  created_at: string;
  updated_at: string;
}

export interface ScheduleSelection {
  id: string;
  attendee_id: string;
  event_id: string;
  created_at: string;
}

