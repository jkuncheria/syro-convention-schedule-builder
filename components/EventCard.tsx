import React, { useState } from 'react';
import { Plus, Check, MapPin, Clock, Users, Tag, AlertTriangle, User, Sparkles } from 'lucide-react';
import { ConventionEvent, FocusGroup, Category } from '../types';
import { useSchedule } from '../context/ScheduleContext';
import { getConflicts } from '../utils/timeUtils';
import { EVENTS } from '../constants';
import { getSpeakersForEvent } from '../utils/speakerUtils';
import SpeakerModal from './SpeakerModal';

interface EventCardProps {
  event: ConventionEvent;
  compact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  const { isSelected, toggleEvent, selectedEventIds } = useSchedule();
  const selected = isSelected(event.id);
  const [selectedSpeakerIndex, setSelectedSpeakerIndex] = useState<number | null>(null);

  // Get speakers for this event
  const speakers = getSpeakersForEvent(event.id);
  const hasSpeakers = speakers.length > 0;

  // Derive schedule list for conflict checking
  const mySchedule = EVENTS.filter(e => selectedEventIds.includes(e.id));
  const conflicts = getConflicts(event, mySchedule);
  const hasConflict = selected && conflicts.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleEvent(event.id);
  };

  const handleViewSpeaker = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSpeakerIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedSpeakerIndex(null);
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
    <div className={`relative bg-white rounded-xl shadow-sm border transition-all duration-200 overflow-hidden flex flex-col ${
        selected ? 'border-indigo-200 ring-1 ring-indigo-100 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
    }`}>
      {/* Guest Speakers Badge */}
      {hasSpeakers && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleViewSpeaker(e, 0);
          }}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>See Guest Speaker{speakers.length > 1 ? 's' : ''}</span>
        </button>
      )}
      
      <div className="p-5 flex flex-col flex-1 min-h-0">
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
          <div className={`absolute ${hasSpeakers ? 'top-12' : 'top-4'} right-4 bg-indigo-600 text-white rounded-full p-1 shadow-sm z-10`}>
              <Check className="w-3 h-3" />
          </div>
      )}

      {/* Speaker Modals - Show all speakers if multiple */}
      {hasSpeakers && selectedSpeakerIndex !== null && speakers[selectedSpeakerIndex] && (
        <>
          <SpeakerModal
            speaker={speakers[selectedSpeakerIndex]}
            isOpen={selectedSpeakerIndex !== null}
            onClose={handleCloseModal}
          />
          {/* If multiple speakers, add navigation */}
          {speakers.length > 1 && selectedSpeakerIndex !== null && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
              {speakers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSpeakerIndex(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSpeakerIndex === index
                      ? 'bg-white text-amber-600 shadow-lg'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  {speakers[index].name.split(' ')[speakers[index].name.split(' ').length - 1]}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventCard;
