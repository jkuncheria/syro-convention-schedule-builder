import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../utils/admin';
import {
  getPopularEvents,
  getTotalAttendees,
  getAttendeesByAgeGroup,
  getPopularEventsByAgeGroup,
  getRegistrationTrend,
  type PopularEvent,
  type AgeGroupStats,
  type EventByAgeGroup,
} from '../lib/analytics';
import { EVENTS } from '../constants';
import { BarChart3, Users, Calendar, TrendingUp, RefreshCw } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [popularEvents, setPopularEvents] = useState<PopularEvent[]>([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [ageGroups, setAgeGroups] = useState<AgeGroupStats[]>([]);
  const [eventsByAgeGroup, setEventsByAgeGroup] = useState<EventByAgeGroup[]>([]);
  const [registrationTrend, setRegistrationTrend] = useState<Array<{ date: string; count: number }>>([]);

  useEffect(() => {
    if (!isAdmin(user)) return;

    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const [popular, total, ages, eventsByAge, trend] = await Promise.all([
          getPopularEvents(20),
          getTotalAttendees(),
          getAttendeesByAgeGroup(),
          getPopularEventsByAgeGroup(10),
          getRegistrationTrend(),
        ]);

        setPopularEvents(popular);
        setTotalAttendees(total);
        setAgeGroups(ages);
        setEventsByAgeGroup(eventsByAge);
        setRegistrationTrend(trend);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [user]);

  // Redirect if not admin
  if (!isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  const getEventTitle = (eventId: string): string => {
    const event = EVENTS.find((e) => e.id === eventId);
    return event?.title || eventId;
  };

  const maxSelections = popularEvents[0]?.selection_count || 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
                Analytics Dashboard
              </h1>
              <p className="mt-2 text-gray-600">Convention insights and statistics</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Attendees</p>
                <p className="text-2xl font-bold text-gray-900">{totalAttendees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Event Selections</p>
                <p className="text-2xl font-bold text-gray-900">
                  {popularEvents.reduce((sum, e) => sum + e.selection_count, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Unique Events Selected</p>
                <p className="text-2xl font-bold text-gray-900">{popularEvents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Events */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Most Popular Events</h2>
            <p className="text-sm text-gray-500 mt-1">Top events by selection count</p>
          </div>
          <div className="p-6">
            {popularEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No event selections yet</p>
            ) : (
              <div className="space-y-4">
                {popularEvents.map((event) => (
                  <div key={event.event_id} className="flex items-center">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{getEventTitle(event.event_id)}</p>
                      <p className="text-sm text-gray-500">{event.event_id}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${(event.selection_count / maxSelections) * 100}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-gray-900 w-12 text-right">
                        {event.selection_count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Age Group Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Attendees by Age Group</h2>
            </div>
            <div className="p-6">
              {ageGroups.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No attendees yet</p>
              ) : (
                <div className="space-y-4">
                  {ageGroups.map((group) => {
                    const maxCount = Math.max(...ageGroups.map((g) => g.count));
                    return (
                      <div key={group.age_group}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{group.age_group}</span>
                          <span className="text-sm font-bold text-gray-900">{group.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-indigo-600 h-3 rounded-full"
                            style={{ width: `${(group.count / maxCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Registration Trend */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Registration Trend</h2>
              <p className="text-sm text-gray-500 mt-1">Daily registrations</p>
            </div>
            <div className="p-6">
              {registrationTrend.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No registration data yet</p>
              ) : (
                <div className="space-y-3">
                  {registrationTrend.map((day) => {
                    const maxCount = Math.max(...registrationTrend.map((d) => d.count));
                    const date = new Date(day.date);
                    const formattedDate = date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                    return (
                      <div key={day.date}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{formattedDate}</span>
                          <span className="text-sm font-bold text-gray-900">{day.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(day.count / maxCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Events by Age Group */}
        {eventsByAgeGroup.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Popular Events by Age Group</h2>
              <p className="text-sm text-gray-500 mt-1">Top events segmented by attendee age</p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age Group
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Selections
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {eventsByAgeGroup.map((item, idx) => (
                      <tr key={`${item.event_id}-${item.age_group}-${idx}`}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {getEventTitle(item.event_id)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {item.age_group}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          {item.selection_count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;

