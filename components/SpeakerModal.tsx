import React, { useEffect } from 'react';
import { X, Calendar, Users } from 'lucide-react';
import { Speaker } from '../utils/speakerUtils';

const DAY_LABELS: Record<string, string> = {
  'Thursday': 'Thursday, July 9',
  'Friday': 'Friday, July 10',
  'Saturday': 'Saturday, July 11',
  'Sunday': 'Sunday, July 12',
};

interface SpeakerModalProps {
  speaker: Speaker;
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerModal: React.FC<SpeakerModalProps> = ({ speaker, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Animated Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-200" />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image */}
            <div className="lg:w-2/5 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {speaker.image ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-2xl opacity-50"></div>
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="relative w-full aspect-square object-cover object-center rounded-full border-4 border-white shadow-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.placeholder')) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'placeholder relative w-full aspect-square flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full border-4 border-white shadow-2xl';
                          placeholder.innerHTML = '<svg class="h-24 w-24 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>';
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full border-4 border-white shadow-2xl">
                    <Users className="h-24 w-24 text-indigo-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="lg:w-3/5 p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {speaker.name}
                  </h2>
                  <p className="text-lg text-indigo-600 font-semibold mb-4">
                    {speaker.title}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100">
                    <Calendar className="h-4 w-4" />
                    {DAY_LABELS[speaker.day]}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                {/* Bio */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {speaker.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerModal;

