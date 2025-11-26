import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Clock, Sparkles, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Hero Section with Background Image */}
      <div className="relative isolate px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero.jpg)' }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 -z-10 bg-black/30" />

        <div className="mx-auto max-w-5xl relative z-10">
          {/* Badge with animation */}
          <div className="mb-10 flex justify-center animate-fade-in">
            <div className="group relative inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-white/20 hover:bg-white transition-all duration-300 shadow-lg">
              <Sparkles className="h-4 w-4 text-blue-600 group-hover:rotate-12 transition-transform" />
              <span>Registration is now open for Syro-Convention 2026</span>
            </div>
          </div>

          {/* Main Heading with gradient text */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-4 drop-shadow-lg">
              Build Your Perfect
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent drop-shadow-md">
                Convention Experience
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl leading-8 text-white mb-12 max-w-3xl mx-auto font-light drop-shadow-md">
              Browse dozens of sessions, workshops, and liturgies across 4 days. 
              <span className="block mt-2 text-white/90">Create a personalized agenda that fits your interests.</span>
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={handleStartBuilding}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Building My Schedule
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                onClick={handleViewSchedule}
                className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg ring-1 ring-inset ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300"
              >
                View Saved Schedule
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">4</div>
              <div className="text-sm text-white/90 drop-shadow-sm">Days</div>
            </div>
            <div className="text-center border-x border-white/30">
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">60+</div>
              <div className="text-sm text-white/90 drop-shadow-sm">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">24/7</div>
              <div className="text-sm text-white/90 drop-shadow-sm">Access</div>
            </div>
          </div>
        </div>
      </div>

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
