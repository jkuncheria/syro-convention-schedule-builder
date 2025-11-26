import { User } from '../context/AuthContext';

export const ADMIN_NAME = 'SYRO ADMIN';
export const ADMIN_AGE_GROUP = '25-45'; // Admin uses "25-45" age group

export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  return user.name === ADMIN_NAME && user.age === ADMIN_AGE_GROUP;
}

