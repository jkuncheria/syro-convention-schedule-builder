import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Attendee } from '../lib/supabase';

export interface User {
  id: string;
  name: string;
  age: string; // This now stores age_group (Youth, Young Adults, Adults, Seniors)
}

interface AuthContextType {
  user: User | null;
  login: (name: string, ageGroup: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Map age groups to representative ages for database storage
const AGE_GROUP_TO_AGE: Record<string, number> = {
  'Youth': 15,
  'Young Adults': 22,
  'Adults': 33,
  'Seniors': 75,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'syro_convention_auth_v1';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount and verify with Supabase
  useEffect(() => {
    const loadUser = async () => {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        try {
          const userData = JSON.parse(saved);
          // Verify the attendee still exists in Supabase
          const { data, error } = await supabase
            .from('attendees')
            .select('id, name, age')
            .eq('id', userData.id)
            .single();

          if (error || !data) {
            // Attendee not found, clear local storage
            localStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);
          } else {
            // Map age back to age group (approximate)
            const age = data.age;
            let ageGroup = 'Adults';
            if (age < 18) ageGroup = 'Youth';
            else if (age >= 18 && age <= 25) ageGroup = 'Young Adults';
            else if (age >= 26 && age < 70) ageGroup = 'Adults';
            else ageGroup = 'Seniors';
            
            setUser({
              id: data.id,
              name: data.name,
              age: ageGroup,
            });
          }
        } catch (e) {
          console.error("Failed to parse auth from local storage", e);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (name: string, ageGroup: string) => {
    setIsLoading(true);
    try {
      // Map age group to representative age for database
      const ageNum = AGE_GROUP_TO_AGE[ageGroup] || 25;
      
      // Check if attendee already exists (same name and age group)
      // We check by name and the mapped age number
      const { data: existingAttendees, error: searchError } = await supabase
        .from('attendees')
        .select('id, name, age')
        .eq('name', name.trim())
        .eq('age', ageNum)
        .limit(1);

      if (searchError) {
        console.error('Error searching for attendee:', {
          message: searchError.message,
          code: searchError.code,
          details: searchError.details,
          hint: searchError.hint,
        });
        // Continue to try creating new attendee - might be first time
      }

      let attendeeId: string;

      if (existingAttendees && existingAttendees.length > 0) {
        // Use existing attendee
        attendeeId = existingAttendees[0].id;
      } else {
        // Create new attendee
        const { data: newAttendee, error: insertError } = await supabase
          .from('attendees')
          .insert({
            name: name.trim(),
            age: ageNum,
          })
          .select('id')
          .single();

        if (insertError) {
          console.error('Error creating attendee:', {
            message: insertError.message,
            code: insertError.code,
            details: insertError.details,
            hint: insertError.hint,
            status: (insertError as any).status,
          });
          // If it's a unique constraint error, try to find the attendee again
          if (insertError.code === '23505' || insertError.message?.includes('duplicate')) {
            const { data: retryAttendees } = await supabase
              .from('attendees')
              .select('id')
              .eq('name', name.trim())
              .eq('age', ageNum)
              .limit(1);
            
            if (retryAttendees && retryAttendees.length > 0) {
              attendeeId = retryAttendees[0].id;
            } else {
              throw insertError;
            }
          } else {
            throw insertError;
          }
        } else {
          attendeeId = newAttendee.id;
        }
      }

      const userData: User = {
        id: attendeeId,
        name: name.trim(),
        age: ageGroup, // Store age group string
      };

      setUser(userData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

