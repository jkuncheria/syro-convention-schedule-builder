import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  age: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, age: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'syro_convention_auth_v1';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const userData = JSON.parse(saved);
        setUser(userData);
      } catch (e) {
        console.error("Failed to parse auth from local storage", e);
      }
    }
  }, []);

  const login = (name: string, age: string) => {
    const userData: User = { name: name.trim(), age: age.trim() };
    setUser(userData);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Also clear schedule when logging out
    localStorage.removeItem('syro_convention_schedule_v1');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
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

