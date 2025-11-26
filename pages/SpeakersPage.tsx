import React, { useState } from 'react';
import { Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Day } from '../types';
import { SPEAKERS, Speaker } from '../utils/speakerUtils';

const DAY_LABELS: Record<Day, string> = {
  [Day.Thursday]: 'Thursday, July 9',
  [Day.Friday]: 'Friday, July 10',
  [Day.Saturday]: 'Saturday, July 11',
  [Day.Sunday]: 'Sunday, July 12',
};

const SpeakersPage: React.FC = () => {
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day | 'all'>('all');

  const filteredSpeakers = selectedDay === 'all' 
    ? SPEAKERS 
    : SPEAKERS.filter(s => s.day === selectedDay);

  const speakersByDay = Object.values(Day).reduce((acc, day) => {
    acc[day] = SPEAKERS.filter(s => s.day === day);
    return acc;
  }, {} as Record<Day, Speaker[]>);

  const toggleExpand = (speakerName: string) => {
    setExpandedSpeaker(expandedSpeaker === speakerName ? null : speakerName);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-6">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Speakers</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the distinguished speakers joining us for Syro-Convention 2026. 
              From faith leaders to artists, entrepreneurs to medical professionals, 
              our speakers bring diverse perspectives and inspiring stories.
            </p>
          </div>
        </div>
      </div>

      {/* Day Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDay === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            All Days
          </button>
          {Object.values(Day).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Calendar className="h-4 w-4" />
              {DAY_LABELS[day]}
            </button>
          ))}
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpeakers.map((speaker) => {
            const isExpanded = expandedSpeaker === speaker.name;
            const bioPreview = speaker.bio.substring(0, 150) + '...';
            
            return (
              <div
                key={speaker.name}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Speaker Image */}
                <div className="w-full aspect-[3/2] bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="max-w-full max-h-full object-contain object-center"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.placeholder')) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'placeholder w-full h-full flex items-center justify-center bg-gray-200 text-gray-400';
                          placeholder.innerHTML = '<svg class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>';
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <Users className="h-16 w-16" />
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 min-h-[100px]">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-indigo-600 font-medium mb-3 line-clamp-2">
                      {speaker.title}
                    </p>
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                      <Calendar className="h-3 w-3" />
                      {DAY_LABELS[speaker.day]}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isExpanded ? speaker.bio : bioPreview}
                    </p>
                    {speaker.bio.length > 150 && (
                      <button
                        onClick={() => toggleExpand(speaker.name)}
                        className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            Show Less <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSpeakers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No speakers found for the selected day.</p>
          </div>
        )}

        {/* Summary by Day */}
        {selectedDay === 'all' && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Speakers by Day
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(Day).map((day) => (
                <div
                  key={day}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-900">{DAY_LABELS[day]}</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mb-1">
                    {speakersByDay[day].length}
                  </p>
                  <p className="text-sm text-gray-600">
                    {speakersByDay[day].length === 1 ? 'Speaker' : 'Speakers'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakersPage;

