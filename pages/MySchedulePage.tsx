import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, LayoutGrid } from 'lucide-react';
import { useSchedule } from '../context/ScheduleContext';
import { EVENTS } from '../constants';
import { Day } from '../types';
import EventCard from '../components/EventCard';
import { getMinutesFromTime } from '../utils/timeUtils';

const MySchedulePage: React.FC = () => {
  const { selectedEventIds } = useSchedule();
  const [activeDay, setActiveDay] = useState<Day>(Day.Thursday);

  // Filter selected events and sort by time
  const myEvents = useMemo(() => {
    return EVENTS.filter((e) => selectedEventIds.includes(e.id));
  }, [selectedEventIds]);

  const dayEvents = useMemo(() => {
    return myEvents
      .filter((e) => e.day === activeDay)
      .sort((a, b) => getMinutesFromTime(a.startTime) - getMinutesFromTime(b.startTime));
  }, [myEvents, activeDay]);

  const isEmpty = myEvents.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-6">
                <Calendar className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your schedule is empty</h2>
            <p className="text-gray-500 mb-8">
            You haven't added any events yet. Head over to the builder to browse sessions.
            </p>
            <Link
            to="/builder"
            className="inline-flex items-center justify-center w-full rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Browse Events <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
       {/* Header */}
       <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
            <p className="mt-2 text-gray-600">
                You have {myEvents.length} events saved.
            </p>
          </div>
          <Link to="/builder" className="hidden sm:inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
             <LayoutGrid className="w-4 h-4 mr-2" />
             Browse All Events
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Day Tabs */}
        <div className="mb-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a day</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={activeDay}
              onChange={(e) => setActiveDay(e.target.value as Day)}
            >
              {Object.values(Day).map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              {Object.values(Day).map((day) => {
                 const count = myEvents.filter(e => e.day === day).length;
                 const isActive = day === activeDay;
                 return (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`
                        ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
                        rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150
                        `}
                    >
                        {day}
                        <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium inline-block ${isActive ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-800'}`}>
                            {count}
                        </span>
                    </button>
                 );
              })}
            </nav>
          </div>
        </div>

        {/* Timeline View */}
        <div className="space-y-6">
            {dayEvents.length > 0 ? (
                 dayEvents.map((event) => (
                    <div key={event.id} className="flex flex-col sm:flex-row gap-4">
                        {/* Time Column (Desktop) */}
                        <div className="hidden sm:flex flex-col items-end w-32 pt-6 flex-shrink-0 text-right">
                            <span className="text-lg font-bold text-gray-900">{event.startTime}</span>
                            <span className="text-sm text-gray-500">to {event.endTime}</span>
                        </div>
                        
                        {/* Card Column */}
                        <div className="flex-grow">
                             {/* Mobile Time Header */}
                             <div className="sm:hidden mb-2 text-sm font-semibold text-indigo-600">
                                {event.startTime} - {event.endTime}
                             </div>
                            <EventCard event={event} />
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 italic">No events scheduled for {activeDay}.</p>
                    <Link to="/builder" className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Find events for {activeDay} &rarr;
                    </Link>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MySchedulePage;
