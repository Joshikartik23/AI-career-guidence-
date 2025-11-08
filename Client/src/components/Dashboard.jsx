import React from 'react';
import { Sparkles, Target, TrendingUp } from 'lucide-react';
import CareerCard from './CareerCard';

function Dashboard({ userData, recommendations, onReset, onEditProfile, darkMode, cardBg, textClass, subtextClass }) {
  
  // Guard Clause to prevent errors if data is missing
  if (!userData || !userData.name) {
    return (
        <div className={`p-8 rounded-2xl ${cardBg} ${textClass} text-center shadow-xl`}>
            <p className="text-xl font-bold text-red-500 mb-4">Error: Profile Data Missing</p>
            <p className={subtextClass}>Please complete your profile to view recommendations.</p>
            <button 
              onClick={onEditProfile} 
              className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Go to Profile Setup
            </button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZHRoPSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative z-10 px-8 py-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="animate-pulse" />
                Welcome back, {userData.name}!
              </h2>
              <p className="text-indigo-100">
                🎓 {userData.education} • {userData.skills.length} Skills • {userData.interests.length} Interests
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onEditProfile}
                className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-lg text-white rounded-xl hover:bg-opacity-30 transition-all font-semibold"
              >
                Edit Profile
              </button>
              <button
                onClick={onReset}
                className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-lg text-white rounded-xl hover:bg-opacity-30 transition-all font-semibold"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Career Recommendations */}
      <div className={`${cardBg} rounded-2xl shadow-xl p-8`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl">
            <Target className="text-white" size={28} />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${textClass}`}>Top AI Recommendations</h2>
            <p className={subtextClass}>Based on your profile, here are your best-matched career paths.</p>
          </div>
        </div>

        <div className="space-y-8">
          {recommendations.map((rec, index) => (
            <CareerCard
              key={rec.careerName} // Use careerName from DB
              career={rec}
              index={index}
              darkMode={darkMode}
              textClass={textClass}
              subtextClass={subtextClass}
              cardBg={cardBg}
            />
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className={`text-center py-12 border-2 border-dashed ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-xl`}>
            <TrendingUp size={48} className={`mx-auto mb-4 ${subtextClass}`} />
            <p className={`text-xl font-semibold ${textClass}`}>No Recommendations Yet</p>
            <p className={subtextClass}>Please ensure your **Profile** has at least one skill and one interest to generate a path.</p>
            <button
              onClick={onEditProfile}
              className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Go to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;