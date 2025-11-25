import React from 'react';
import { Plus, Check, MapPin, Clock, Users, Tag, AlertTriangle } from 'lucide-react';
import { ConventionEvent, FocusGroup, Category } from '../types';
import { useSchedule } from '../context/ScheduleContext';
import { getConflicts } from '../utils/timeUtils';
import { EVENTS } from '../constants';

interface EventCardProps {
  event: ConventionEvent;
  compact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  const { isSelected, toggleEvent, selectedEventIds } = useSchedule();
  const selected = isSelected(event.id);

  // Derive schedule list for conflict checking
  const mySchedule = EVENTS.filter(e => selectedEventIds.includes(e.id));
  const conflicts = getConflicts(event, mySchedule);
  const hasConflict = selected && conflicts.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleEvent(event.id);
  };

  const getCategoryColor = (cat: Category) => {
    switch (cat) {
        case Category.Keynote: return 'bg-purple-100 text-purple-800';
        case Category.Liturgy: return 'bg-amber-100 text-amber-800';
        case Category.Social: return 'bg-pink-100 text-pink-800';
        case Category.Workshop: return 'bg-blue-100 text-blue-800';
        case Category.Panel: return 'bg-emerald-100 text-emerald-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`relative bg-white rounded-xl shadow-sm border transition-all duration-200 ${
        selected ? 'border-indigo-200 ring-1 ring-indigo-100 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
    }`}>
      <div className="p-5 flex flex-col h-full">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-2">
            <div className="flex flex-wrap gap-2 mb-2">
                 <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(event.category)}`}>
                    <Tag className="w-3 h-3 mr-1" /> {event.category}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    <Users className="w-3 h-3 mr-1" /> {event.focusGroup}
                </span>
            </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
            {event.title}
        </h3>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{event.day}, {event.startTime} - {event.endTime}</span>
            </div>
            <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{event.venue}</span>
            </div>
        </div>

        {!compact && (
             <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.description}</p>
        )}

        {/* Conflict Warning */}
        {hasConflict && (
            <div className="mb-4 flex items-start p-2 bg-amber-50 rounded-md border border-amber-200 text-amber-800 text-xs">
                <AlertTriangle className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5" />
                <span>Overlaps with: {conflicts.join(', ')}</span>
            </div>
        )}

        {/* Footer / Action */}
        <div className="mt-auto pt-2">
            <button
                onClick={handleToggle}
                className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selected 
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500 border border-red-200' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm'
                }`}
            >
                {selected ? (
                    <>
                        <span className="mr-2">Remove</span>
                        {/* Minus icon or similar could go here */}
                    </>
                ) : (
                    <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Schedule
                    </>
                )}
            </button>
        </div>
      </div>
      
      {/* Selected Indicator Checkmark */}
      {selected && (
          <div className="absolute top-4 right-4 bg-indigo-600 text-white rounded-full p-1 shadow-sm">
              <Check className="w-3 h-3" />
          </div>
      )}
    </div>
  );
};

export default EventCard;
