export enum Day {
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export enum FocusGroup {
  All = 'All',
  Youth = 'Youth',
  YoungAdults = 'Young Adults',
  Families = 'Families',
  Clergy = 'Clergy'
}

export enum Category {
  Keynote = 'Keynote',
  Workshop = 'Workshop',
  Liturgy = 'Liturgy',
  Social = 'Social',
  Panel = 'Panel'
}

export interface ConventionEvent {
  id: string;
  title: string;
  day: Day;
  startTime: string; // e.g., "11:00 AM"
  endTime: string;   // e.g., "12:00 PM"
  venue: string;
  focusGroup: FocusGroup;
  category: Category;
  description: string;
}

export interface ScheduleContextType {
  selectedEventIds: string[];
  toggleEvent: (eventId: string) => void;
  isSelected: (eventId: string) => boolean;
  selectedCount: number;
}
