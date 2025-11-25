import { ConventionEvent } from '../types';

/**
 * Converts a time string (e.g., "11:30 AM") into minutes from midnight.
 */
export const getMinutesFromTime = (timeStr: string): number => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (hours === 12 && modifier === 'AM') {
    hours = 0;
  }
  if (hours !== 12 && modifier === 'PM') {
    hours += 12;
  }

  return hours * 60 + minutes;
};

/**
 * Checks if two time ranges overlap.
 */
export const doTimesOverlap = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const s1 = getMinutesFromTime(start1);
  const e1 = getMinutesFromTime(end1);
  const s2 = getMinutesFromTime(start2);
  const e2 = getMinutesFromTime(end2);

  // Overlap occurs if one starts before the other ends
  return s1 < e2 && s2 < e1;
};

/**
 * Returns a list of conflicting event IDs for a specific event against a list of other events.
 */
export const getConflicts = (
  targetEvent: ConventionEvent,
  mySchedule: ConventionEvent[]
): string[] => {
  const conflicts: string[] = [];
  
  mySchedule.forEach((existingEvent) => {
    // Skip self and different days
    if (existingEvent.id === targetEvent.id || existingEvent.day !== targetEvent.day) {
      return;
    }

    if (
      doTimesOverlap(
        targetEvent.startTime,
        targetEvent.endTime,
        existingEvent.startTime,
        existingEvent.endTime
      )
    ) {
      conflicts.push(existingEvent.title);
    }
  });

  return conflicts;
};
