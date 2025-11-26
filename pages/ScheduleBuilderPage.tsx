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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Events</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Browse the convention catalog and build your schedule.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col space-y-4">
            
            {/* Search Row */}
            <div className="flex items-center gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Clear Filters */}
              {(selectedDay !== 'All' || selectedFocus !== 'All' || selectedCategory !== 'All' || searchQuery !== '') && (
                  <button 
                      onClick={clearFilters}
                      className="flex items-center text-sm text-red-600 hover:text-red-800 font-medium shrink-0 py-2 px-3 rounded-md hover:bg-red-50 transition-colors whitespace-nowrap"
                  >
                      <XCircle className="w-4 h-4 mr-1.5" /> 
                      <span className="hidden sm:inline">Clear</span>
                      <span className="sm:hidden">Clear</span>
                  </button>
              )}
            </div>

            {/* Filter Pills Container */}
            <div className="flex flex-col gap-3">
              {/* Day Filter Pills */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Day</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDay('All')}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all touch-manipulation ${
                      selectedDay === 'All'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Days
                  </button>
                  {Object.values(Day).map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all touch-manipulation ${
                        selectedDay === day
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Group Filter Pills */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Audience</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedFocus('All')}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all touch-manipulation ${
                      selectedFocus === 'All'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Audiences
                  </button>
                  {Object.values(FocusGroup).filter(f => f !== 'All').map(focus => (
                    <button
                      key={focus}
                      onClick={() => setSelectedFocus(focus)}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all touch-manipulation ${
                        selectedFocus === focus
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {focus}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all touch-manipulation ${
                      selectedCategory === 'All'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {Object.values(Category).map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all touch-manipulation ${
                        selectedCategory === category
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500 font-medium px-1">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </div>
        
        {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
            </div>
        ) : (
            <div className="text-center py-12 sm:py-20 px-4">
                <Filter className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-300" />
                <h3 className="mt-2 text-sm sm:text-base font-semibold text-gray-900">No events found</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">Try adjusting your search or filters.</p>
                <div className="mt-4 sm:mt-6">
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
