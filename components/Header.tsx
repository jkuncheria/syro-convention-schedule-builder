import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X, LayoutGrid, Home, LogOut, User, BarChart3, Users, LogIn } from 'lucide-react';
import { useSchedule } from '../context/ScheduleContext';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../utils/admin';

const Header: React.FC = () => {
  const { selectedCount } = useSchedule();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'All Events', path: '/builder', icon: LayoutGrid },
    { name: 'My Schedule', path: '/my-schedule', icon: Calendar, badge: selectedCount > 0 ? selectedCount : null },
    { name: 'Speakers', path: '/speakers', icon: Users },
    ...(isAdmin(user) ? [{ name: 'Analytics', path: '/analytics', icon: BarChart3 }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Syro<span className="text-indigo-600"> Convention</span></span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  isActive(link.path)
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {link.name}
                {link.badge !== null && (
                  <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{user.age}</span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center pl-4 border-l border-gray-200">
                <Link
                  to="/login"
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive('/login')
                      ? 'text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  } rounded-md`}
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden lg:inline">Login</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                        isActive(link.path)
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    }`}
                    >
                    <Icon className="h-5 w-5 mr-3" />
                    {link.name}
                    {link.badge !== null && (
                        <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {link.badge}
                        </span>
                    )}
                    </Link>
                );
            })}
            {user ? (
              <>
                <div className="px-3 py-2 border-t border-gray-200 mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{user.age}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                  isActive('/login')
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <LogIn className="h-5 w-5 mr-3" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
