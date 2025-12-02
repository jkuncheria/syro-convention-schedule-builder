import React from 'react';
import { SPEAKERS, Speaker } from '../utils/speakerUtils';

interface SpeakersScrollBannerProps {
  compact?: boolean;
  onSpeakerClick?: (speaker: Speaker) => void;
}

const SpeakersScrollBanner: React.FC<SpeakersScrollBannerProps> = ({ compact = false, onSpeakerClick }) => {
  // Filter speakers with images
  const speakersWithImages = SPEAKERS.filter(
    speaker => speaker.image && speaker.image.trim() !== ''
  );

  // Create enough duplicates for seamless infinite scroll (need at least 2 sets)
  const scrollContent = [...speakersWithImages, ...speakersWithImages];

  return (
    <div className={`relative w-full overflow-hidden ${compact ? 'py-4 -mx-2 sm:-mx-4' : 'bg-gray-50 py-8'}`}>
      {!compact && (
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Our Guest Speakers</h2>
        </div>
      )}
      
      {/* Scrolling Container */}
      <div className={`relative w-full overflow-hidden ${compact ? 'px-2 sm:px-4' : ''}`}>
        {/* Fade gradients for compact mode */}
        {compact && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-6 z-10 pointer-events-none bg-gradient-to-r from-white via-white/30 to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-6 z-10 pointer-events-none bg-gradient-to-l from-white via-white/30 to-transparent"></div>
          </>
        )}
        <div className="flex animate-scroll gap-6 w-max">
          {/* Render duplicated speakers for seamless scroll */}
          {scrollContent.map((speaker, index) => (
            <div
              key={`speaker-${index}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => onSpeakerClick?.(speaker)}
            >
              <div className={`${compact ? 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32' : 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48'} rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <p className={`${compact ? 'text-xs max-w-[100px] sm:max-w-[120px]' : 'text-xs sm:text-sm max-w-[120px] sm:max-w-[160px]'} font-medium text-gray-700 text-center group-hover:text-indigo-600 transition-colors`}>
                {speaker.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add CSS animation via style tag */}
      <style>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default SpeakersScrollBanner;

