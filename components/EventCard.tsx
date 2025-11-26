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
    <div className={`relative bg-white rounded-lg sm:rounded-xl shadow-sm border transition-all duration-200 overflow-hidden flex flex-col ${
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
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm flex-shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">See Guest Speaker{speakers.length > 1 ? 's' : ''}</span>
        </button>
      )}
      
      <div className="p-4 sm:p-5 flex flex-col flex-1 min-h-0">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-2">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 flex-1 min-w-0">
                 <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${getCategoryColor(event.category)}`}>
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 flex-shrink-0" /> 
                    <span className="truncate">{event.category}</span>
                </span>
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 flex-shrink-0" /> 
                    <span className="truncate">{event.focusGroup}</span>
                </span>
            </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
            {event.title}
        </h3>

        {/* Details */}
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center min-w-0">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" />
                <span className="truncate">{event.day}, {event.startTime} - {event.endTime}</span>
            </div>
            <div className="flex items-center min-w-0">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" />
                <span className="truncate">{event.venue}</span>
            </div>
        </div>

        {!compact && (
             <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
        )}

        {/* Conflict Warning */}
        {hasConflict && (
            <div className="mb-3 sm:mb-4 flex items-start p-2 bg-amber-50 rounded-md border border-amber-200 text-amber-800 text-[10px] sm:text-xs">
                <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">Overlaps with: {conflicts.join(', ')}</span>
            </div>
        )}

        {/* Footer / Action */}
        <div className="mt-auto pt-2">
            <button
                onClick={handleToggle}
                className={`w-full flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 touch-manipulation ${
                    selected 
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500 border border-red-200' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm'
                }`}
            >
                {selected ? (
                    <>
                        <span className="mr-1.5 sm:mr-2">Remove</span>
                    </>
                ) : (
                    <>
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                        <span>Add to Schedule</span>
                    </>
                )}
            </button>
        </div>
      </div>
      
      {/* Selected Indicator Checkmark */}
      {selected && (
          <div className={`absolute ${hasSpeakers ? 'top-10 sm:top-12' : 'top-3 sm:top-4'} right-3 sm:right-4 bg-indigo-600 text-white rounded-full p-0.5 sm:p-1 shadow-sm z-10`}>
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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
            <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-1.5 sm:gap-2 px-2 max-w-[calc(100vw-1rem)] overflow-x-auto">
              {speakers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSpeakerIndex(index)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap touch-manipulation ${
                    selectedSpeakerIndex === index
                      ? 'bg-white text-amber-600 shadow-lg'
                      : 'bg-white/90 text-gray-600 hover:bg-white'
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
