import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SpeakersScrollBanner from '../components/SpeakersScrollBanner';
import SpeakerModal from '../components/SpeakerModal';
import { Speaker } from '../utils/speakerUtils';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Hero gallery images
  const heroImages = [
    '/hero-images/1.jpg',
    '/hero-images/2.jpg',
    '/hero-images/3.png',
    '/hero-images/4.jpg',
    '/hero-images/5.jpg',
    '/hero-images/6.jpg',
    '/hero-images/7.jpg',
  ];
  
  // Parish Visits carousel
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Speaker modal state
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  
  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
  };
  
  const handleCloseModal = () => {
    setSelectedSpeaker(null);
  };
  
  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleStartBuilding = () => {
    if (isAuthenticated) {
      navigate('/builder');
    } else {
      navigate('/login?redirect=/builder');
    }
  };

  const handleViewSchedule = () => {
    if (isAuthenticated) {
      navigate('/my-schedule');
    } else {
      navigate('/login?redirect=/my-schedule');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Hero Section with Split Layout */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-0 pb-16 sm:pb-24 lg:pb-32">
        {/* Guest Speakers Scroll Banner - Above Hero */}
        <div className="mb-8 sm:mb-12">
          <SpeakersScrollBanner compact={true} onSpeakerClick={handleSpeakerClick} />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:items-center">
            {/* Left Side - Text Content */}
            <div className="relative z-10 text-center lg:text-left">
              {/* Badge with animation */}
              <div className="mb-8 animate-fade-in flex justify-center lg:justify-start">
                <div className="group relative inline-flex items-center gap-2 rounded-full bg-indigo-100 px-5 py-2.5 text-sm font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-200 transition-all duration-300 shadow-sm">
                  <Sparkles className="h-4 w-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
                  <span>Registration is now open for Syro-Convention 2026</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
                Build Your Perfect
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Convention Experience
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl leading-8 text-gray-600 mb-8">
                Browse dozens of sessions, workshops, and liturgies across 4 days. Create a personalized agenda that fits your interests.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12">
                <button
                  onClick={handleStartBuilding}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building My Schedule
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button
                  onClick={handleViewSchedule}
                  className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg ring-1 ring-inset ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                >
                  View Saved Schedule
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Side - Parish Visits Carousel */}
            <div className="relative flex items-center justify-center w-full mt-8 lg:mt-0 order-2 lg:order-1">
              <div className="relative w-full flex flex-col items-center px-2 sm:px-4">
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-full max-w-full sm:w-[550px] md:w-[700px] lg:w-[850px] xl:w-[1000px] 2xl:w-[1100px] aspect-[3/2] min-h-[200px]">
                    <div className="relative w-full h-full rounded-xl shadow-lg overflow-hidden">
                      {heroImages.map((image, index) => (
                        <div
                          key={`carousel-${index}`}
                          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                            index === carouselIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-gray-700">Parish Visits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speakers Scroll Banner */}
      <SpeakersScrollBanner onSpeakerClick={handleSpeakerClick} />
      
      {/* Speaker Modal */}
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          isOpen={!!selectedSpeaker}
          onClose={handleCloseModal}
        />
      )}

      {/* Feature Section with sophisticated cards */}
      <div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Everything You Need
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              Powerful features to help you plan the perfect convention experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Feature Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-200/50 hover:shadow-2xl hover:ring-indigo-200 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">4 Days of Events</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Explore Keynotes, Workshops, and Socials spread across the long weekend.
                </p>
                <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                  <span>Explore events</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-200/50 hover:shadow-2xl hover:ring-emerald-200 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Personal Agenda</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Select only what you want to attend. We'll remember your choices automatically.
                </p>
                <div className="flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                  <span>Build schedule</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-200/50 hover:shadow-2xl hover:ring-amber-200 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Conflict Detection</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We'll alert you if you double-book yourself so you don't miss a thing.
                </p>
                <div className="flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-700">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
