import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ScheduleContextType } from '../types';
import { useAuth } from './AuthContext';

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

const getStorageKey = (name: string, age: string) => {
  return `syro_convention_schedule_${name}_${age}_v1`;
};

export const ScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);

  // Load from LocalStorage when user changes
  useEffect(() => {
    if (!user) {
      setSelectedEventIds([]);
      return;
    }

    const storageKey = getStorageKey(user.name, user.age);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setSelectedEventIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse schedule from local storage", e);
      }
    } else {
      setSelectedEventIds([]);
    }
  }, [user]);

  // Persist to LocalStorage on change (only if user is logged in)
  useEffect(() => {
    if (!user) return;
    
    const storageKey = getStorageKey(user.name, user.age);
    localStorage.setItem(storageKey, JSON.stringify(selectedEventIds));
  }, [selectedEventIds, user]);

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
