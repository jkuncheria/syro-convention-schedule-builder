import { User } from '../context/AuthContext';

export const ADMIN_NAME = 'SYRO ADMIN';
export const ADMIN_AGE = '2001';

export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  return user.name === ADMIN_NAME && user.age === ADMIN_AGE;
}

