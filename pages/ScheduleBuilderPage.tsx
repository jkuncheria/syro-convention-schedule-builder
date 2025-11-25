import React, { useState, useMemo } from 'react';
import { Search, Filter, XCircle } from 'lucide-react';
import { EVENTS } from '../constants';
import { Day, FocusGroup, Category } from '../types';
import EventCard from '../components/EventCard';

const ScheduleBuilderPage: React.FC = () => {
  // Filter States
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedFocus, setSelectedFocus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const matchDay = selectedDay === 'All' || event.day === selectedDay;
      const matchFocus = selectedFocus === 'All' || event.focusGroup === selectedFocus;
      const matchCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDay && matchFocus && matchCategory && matchSearch;
    });
  }, [selectedDay, selectedFocus, selectedCategory, searchQuery]);

  const clearFilters = () => {
      setSelectedDay('All');
      setSelectedFocus('All');
      setSelectedCategory('All');
      setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Title Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
          <p className="mt-2 text-gray-600">Browse the convention catalog and build your schedule.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
            
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dropdowns Container */}
            <div className="flex flex-wrap gap-2 lg:gap-4 flex-grow">
                 {/* Day Filter */}
                <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="All">All Days</option>
                    {Object.values(Day).map(day => <option key={day} value={day}>{day}</option>)}
                </select>

                {/* Focus Filter */}
                <select
                    value={selectedFocus}
                    onChange={(e) => setSelectedFocus(e.target.value)}
                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="All">All Audiences</option>
                    {Object.values(FocusGroup).filter(f => f !== 'All').map(f => <option key={f} value={f}>{f}</option>)}
                </select>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="All">All Categories</option>
                    {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Clear Filters */}
            {(selectedDay !== 'All' || selectedFocus !== 'All' || selectedCategory !== 'All' || searchQuery !== '') && (
                <button 
                    onClick={clearFilters}
                    className="flex items-center text-sm text-red-600 hover:text-red-800 font-medium shrink-0"
                >
                    <XCircle className="w-4 h-4 mr-1" /> Clear
                </button>
            )}

          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-sm text-gray-500 font-medium">
            Showing {filteredEvents.length} events
        </div>
        
        {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <Filter className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No events found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                <div className="mt-6">
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleBuilderPage;
