import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Clock } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 flex-grow flex items-center">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div className="mx-auto max-w-2xl py-12 sm:py-20 lg:py-24 text-center">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Registration is now open for SyroCon 2025. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Build Your Perfect Convention Experience
          </h1>
          <p className="text-lg leading-8 text-gray-600 mb-10">
            Browse dozens of sessions, workshops, and liturgies across 4 days. Create a personalized agenda that fits your interests and save it directly to your device
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              to="/builder"
              className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center"
            >
              Start Building My Schedule <ArrowRight className="ml-2 w-4 h-4"/>
            </Link>
            <Link to="/my-schedule" className="text-sm font-semibold leading-6 text-gray-900">
              View saved schedule <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">4 Days of Events</h3>
                      <p className="mt-2 text-gray-500">Explore Keynotes, Workshops, and Socials spread across the long weekend.</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="p-3 bg-green-100 rounded-full text-green-600 mb-4">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Personal Agenda</h3>
                      <p className="mt-2 text-gray-500">Select only what you want to attend. We'll remember your choices automatically.</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="p-3 bg-amber-100 rounded-full text-amber-600 mb-4">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Conflict Detection</h3>
                      <p className="mt-2 text-gray-500">We'll alert you if you double-book yourself so you don't miss a thing.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
