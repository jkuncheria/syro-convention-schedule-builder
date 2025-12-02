import React from 'react';

interface ParishImagesScrollBannerProps {
  images: string[];
  compact?: boolean;
}

const ParishImagesScrollBanner: React.FC<ParishImagesScrollBannerProps> = ({ images, compact = false }) => {
  // Create enough duplicates for seamless infinite scroll (need at least 2 sets)
  const scrollContent = [...images, ...images];

  return (
    <div className={`relative w-full overflow-hidden ${compact ? 'py-4 -mx-2 sm:-mx-4' : 'bg-gray-50 py-8'}`}>
      {!compact && (
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Parish Visits</h2>
        </div>
      )}
      
      {/* Scrolling Container */}
      <div className={`relative w-full overflow-hidden ${compact ? 'px-2 sm:px-4' : ''}`}>
        <div className="flex animate-scroll-reverse gap-4 w-max">
          {/* Render duplicated images for seamless scroll */}
          {scrollContent.map((image, index) => (
            <div
              key={`parish-${index}`}
              className="flex-shrink-0"
            >
              <div className={`${compact ? 'w-[28rem] h-48 sm:w-[40rem] sm:h-[20rem] md:w-[48rem] md:h-[22rem] lg:w-[56rem] lg:h-[24rem]' : 'w-40 h-24 sm:w-48 sm:h-28 md:w-56 md:h-32'} rounded-lg overflow-hidden border-2 border-white shadow-md bg-gray-200`}>
                <img
                  src={image}
                  alt={`Parish visit ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add CSS animation via style tag - reverse direction */}
      <style>{`
        @keyframes scroll-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 60s linear infinite;
        }
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ParishImagesScrollBanner;

