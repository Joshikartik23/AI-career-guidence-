import React from 'react';
import { Sparkles, ChevronRight, Target, TrendingUp, BookOpen } from 'lucide-react';

function WelcomeScreen({ onStart, darkMode, cardBg, textClass }) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className={`${cardBg} rounded-3xl shadow-2xl overflow-hidden`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZHRoPSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center text-white">
            <div className="mb-6 inline-block animate-bounce">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-3xl">
                <Sparkles size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Discover Your Dream Career
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              Get AI-powered career recommendations tailored to your unique skills and passions
            </p>
            <button
              onClick={onStart}
              className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Start Your Journey
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {[
          { icon: Target, title: 'Smart Matching', desc: 'AI algorithms match you with ideal careers', color: 'from-blue-500 to-cyan-500' },
          { icon: TrendingUp, title: 'Skill Analysis', desc: 'Identify gaps and growth opportunities', color: 'from-purple-500 to-pink-500' },
          { icon: BookOpen, title: 'Learning Path', desc: 'Curated courses to reach your goals', color: 'from-orange-500 to-red-500' }
        ].map((feature, idx) => (
          <div key={idx} className={`${cardBg} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
            <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl w-fit mb-4`}>
              <feature.icon className="text-white" size={24} />
            </div>
            <h3 className={`text-xl font-bold ${textClass} mb-2`}>{feature.title}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;