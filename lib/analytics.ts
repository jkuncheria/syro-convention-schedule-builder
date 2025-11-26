import { supabase } from './supabase';

/**
 * Analytics utility functions for data analysis
 */

export interface PopularEvent {
  event_id: string;
  selection_count: number;
}

export interface AgeGroupStats {
  age_group: string;
  count: number;
}

export interface EventByAgeGroup {
  event_id: string;
  age_group: string;
  selection_count: number;
}

/**
 * Get the most popular events
 * Note: Supabase doesn't support GROUP BY in the client, so we fetch all and count client-side
 * For better performance with large datasets, use a database function or view
 */
export async function getPopularEvents(limit: number = 10): Promise<PopularEvent[]> {
  const { data, error } = await supabase
    .from('schedule_selections')
    .select('event_id');

  if (error) {
    console.error('Error fetching popular events:', error);
    return [];
  }

  // Count occurrences
  const counts: Record<string, number> = {};
  data?.forEach((selection) => {
    counts[selection.event_id] = (counts[selection.event_id] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([event_id, selection_count]) => ({ event_id, selection_count }))
    .sort((a, b) => b.selection_count - a.selection_count)
    .slice(0, limit);
}

/**
 * Get total number of attendees
 */
export async function getTotalAttendees(): Promise<number> {
  const { count, error } = await supabase
    .from('attendees')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching total attendees:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Get attendees grouped by age group
 */
export async function getAttendeesByAgeGroup(): Promise<AgeGroupStats[]> {
  const { data, error } = await supabase
    .from('attendees')
    .select('age');

  if (error) {
    console.error('Error fetching attendees by age group:', error);
    return [];
  }

  const ageGroups: Record<string, number> = {
    '6-12': 0,
    '13-17': 0,
    '18-24': 0,
    '25-45': 0,
    '46-64': 0,
    '65+': 0,
  };

  data?.forEach((attendee) => {
    const age = attendee.age;
    if (age <= 12) {
      ageGroups['6-12']++;
    } else if (age <= 17) {
      ageGroups['13-17']++;
    } else if (age <= 24) {
      ageGroups['18-24']++;
    } else if (age <= 45) {
      ageGroups['25-45']++;
    } else if (age <= 64) {
      ageGroups['46-64']++;
    } else {
      ageGroups['65+']++;
    }
  });

  return Object.entries(ageGroups)
    .map(([age_group, count]) => ({ age_group, count }))
    .filter((group) => group.count > 0);
}

/**
 * Get popular events by age group
 */
export async function getPopularEventsByAgeGroup(limit: number = 5): Promise<EventByAgeGroup[]> {
  const { data, error } = await supabase
    .from('schedule_selections')
    .select(`
      event_id,
      attendees (
        age
      )
    `);

  if (error) {
    console.error('Error fetching events by age group:', error);
    return [];
  }

  // Process the data
  const eventAgeGroups: Record<string, Record<string, number>> = {};

  data?.forEach((selection: any) => {
    const eventId = selection.event_id;
    const age = selection.attendees?.age;

    if (!age) return;

    let ageGroup: string;
    if (age <= 12) {
      ageGroup = '6-12';
    } else if (age <= 17) {
      ageGroup = '13-17';
    } else if (age <= 24) {
      ageGroup = '18-24';
    } else if (age <= 45) {
      ageGroup = '25-45';
    } else if (age <= 64) {
      ageGroup = '46-64';
    } else {
      ageGroup = '65+';
    }

    if (!eventAgeGroups[eventId]) {
      eventAgeGroups[eventId] = {};
    }
    eventAgeGroups[eventId][ageGroup] = (eventAgeGroups[eventId][ageGroup] || 0) + 1;
  });

  // Convert to array format
  const result: EventByAgeGroup[] = [];
  Object.entries(eventAgeGroups).forEach(([event_id, groups]) => {
    Object.entries(groups).forEach(([age_group, selection_count]) => {
      result.push({ event_id, age_group, selection_count });
    });
  });

  // Sort by selection count descending
  return result.sort((a, b) => b.selection_count - a.selection_count).slice(0, limit);
}

/**
 * Get registration trend (attendees per day)
 */
export async function getRegistrationTrend(): Promise<Array<{ date: string; count: number }>> {
  const { data, error } = await supabase
    .from('attendees')
    .select('created_at')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching registration trend:', error);
    return [];
  }

  const dailyCounts: Record<string, number> = {};

  data?.forEach((attendee) => {
    const date = new Date(attendee.created_at).toISOString().split('T')[0];
    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
  });

  return Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

