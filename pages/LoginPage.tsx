import React, { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { ADMIN_NAME, ADMIN_AGE_GROUP } from '../utils/admin';

interface LoginPageProps {
  redirectTo?: string;
}

const AGE_GROUPS = [
  { value: '6-12', label: '6-12' },
  { value: '13-17', label: '13-17' },
  { value: '18-24', label: '18-24' },
  { value: '25-45', label: '25-45' },
  { value: '46-64', label: '46-64' },
  { value: '65+', label: '65+' },
] as const;

const LoginPage: React.FC<LoginPageProps> = ({ redirectTo }) => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get redirect from URL params or prop
  const redirectPath = redirectTo || searchParams.get('redirect') || '/builder';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, isLoading, navigate, redirectPath]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!ageGroup) {
      setError('Please select your age group');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(name.trim(), ageGroup);
      // Navigation will happen via useEffect when isAuthenticated becomes true
      navigate(redirectPath);
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide more helpful error messages
      if (err?.code === 'PGRST116' || err?.message?.includes('relation') || err?.message?.includes('does not exist')) {
        setError('Database tables not found. Please run the schema.sql file in your Supabase SQL Editor.');
      } else if (err?.code === '42501' || err?.message?.includes('permission') || err?.message?.includes('policy')) {
        setError('Permission denied. Please check your Supabase RLS policies.');
      } else if (err?.code === '23514' || err?.message?.includes('check constraint')) {
        setError('Invalid age value. Please check the age constraint.');
      } else if (err?.status === 400 || err?.status === 406) {
        setError('Database connection error. Please verify your Supabase credentials and that tables exist.');
      } else {
        setError(err?.message || 'Failed to log in. Please check your Supabase setup and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Calendar className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome to Syro-Convention 2026
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your name and select your age group to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Age Group
              </label>
              <div className="grid grid-cols-2 gap-3">
                {AGE_GROUPS.map((group) => (
                  <button
                    key={group.value}
                    type="button"
                    onClick={() => setAgeGroup(group.value)}
                    className={`relative rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      ageGroup === group.value
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-600 ring-offset-2'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50'
                    }`}
                  >
                    {group.label}
                    {ageGroup === group.value && (
                      <div className="absolute top-1 right-1">
                        <div className="h-2 w-2 rounded-full bg-indigo-600" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || isLoading ? 'Loading...' : 'Continue'}
              </button>
            </div>

            <p className="text-xs text-center text-gray-500">
              Your schedule will be saved and restored when you return with the same name and age group.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

