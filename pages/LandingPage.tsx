import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Clock, Sparkles, Users, Zap } from 'lucide-react';
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
      {/* Hero Section with Animated Background */}
      <div className="relative isolate px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 via-cyan-400 to-teal-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Badge with animation */}
          <div className="mb-10 flex justify-center animate-fade-in">
            <div className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-600/20 hover:ring-indigo-600/30 transition-all duration-300">
              <Sparkles className="h-4 w-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
              <span>Registration is now open for SyroCon 2026</span>
            </div>
          </div>

          {/* Main Heading with gradient text */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-4">
              Build Your Perfect
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Convention Experience
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl leading-8 text-gray-600 mb-12 max-w-3xl mx-auto font-light">
              Browse dozens of sessions, workshops, and liturgies across 4 days. 
              <span className="block mt-2 text-gray-500">Create a personalized agenda that fits your interests.</span>
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={handleStartBuilding}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Building My Schedule
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">60+</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Access</div>
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

      {/* Additional Feature Section */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 mb-6">
                <Zap className="mr-2 h-4 w-4" />
                Smart Features
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Your Schedule, Your Way
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Filter by day, focus group, or category. Search for specific sessions. 
                Build a schedule that perfectly matches your interests and availability.
              </p>
              <ul className="space-y-3">
                {['Advanced filtering options', 'Real-time conflict detection', 'Cloud sync across devices', 'Export your schedule'].map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <CheckCircle className="mr-3 h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <Users className="h-24 w-24 text-indigo-600 mx-auto mb-4 opacity-50" />
                  <div className="text-sm font-semibold text-gray-600">Visual Preview</div>
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
