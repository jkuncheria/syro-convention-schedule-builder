import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ScheduleContextType } from '../types';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load schedule from Supabase when user changes
  useEffect(() => {
    const loadSchedule = async () => {
      if (!user) {
        setSelectedEventIds([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('schedule_selections')
          .select('event_id')
          .eq('attendee_id', user.id);

        if (error) {
          console.error('Error loading schedule:', error);
          setSelectedEventIds([]);
        } else {
          const eventIds = data?.map((selection) => selection.event_id) || [];
          setSelectedEventIds(eventIds);
        }
      } catch (error) {
        console.error('Error loading schedule:', error);
        setSelectedEventIds([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedule();
  }, [user]);

  // Save to Supabase when selections change
  const saveSchedule = useCallback(async (eventIds: string[]) => {
    if (!user) return;

    try {
      // Get current selections from database
      const { data: currentSelections } = await supabase
        .from('schedule_selections')
        .select('event_id')
        .eq('attendee_id', user.id);

      const currentEventIds = currentSelections?.map((s) => s.event_id) || [];
      
      // Find events to add
      const toAdd = eventIds.filter((id) => !currentEventIds.includes(id));
      
      // Find events to remove
      const toRemove = currentEventIds.filter((id) => !eventIds.includes(id));

      // Add new selections
      if (toAdd.length > 0) {
        const insertData = toAdd.map((eventId) => ({
          attendee_id: user.id,
          event_id: eventId,
        }));

        const { error: insertError } = await supabase
          .from('schedule_selections')
          .insert(insertData);

        if (insertError) {
          console.error('Error adding schedule selections:', insertError);
        }
      }

      // Remove deleted selections
      if (toRemove.length > 0) {
        const { error: deleteError } = await supabase
          .from('schedule_selections')
          .delete()
          .eq('attendee_id', user.id)
          .in('event_id', toRemove);

        if (deleteError) {
          console.error('Error removing schedule selections:', deleteError);
        }
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  }, [user]);

  // Debounce save operations
  useEffect(() => {
    if (!user || isLoading) return;

    const timeoutId = setTimeout(() => {
      saveSchedule(selectedEventIds);
    }, 500); // Wait 500ms after last change before saving

    return () => clearTimeout(timeoutId);
  }, [selectedEventIds, user, isLoading, saveSchedule]);

  const toggleEvent = (eventId: string) => {
    setSelectedEventIds((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const isSelected = (eventId: string) => selectedEventIds.includes(eventId);

  const value = {
    selectedEventIds,
    toggleEvent,
    isSelected,
    selectedCount: selectedEventIds.length,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
