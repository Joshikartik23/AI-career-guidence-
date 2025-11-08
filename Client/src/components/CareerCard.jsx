import React, { useState } from 'react';
import { DollarSign, BarChart3, Zap, ChevronRight, BookOpen } from 'lucide-react';
import StatCard from './StatCard';
import SkillList from './SkillList';
import CourseCard from './CourseCard';

function CareerCard({ career, index, darkMode, textClass, subtextClass, cardBg }) {
  const [showDetails, setShowDetails] = useState(false);

  let rankColor = '';
  if (index === 0) rankColor = 'bg-gradient-to-br from-yellow-400 to-amber-500 ring-yellow-300';
  else if (index === 1) rankColor = 'bg-gradient-to-br from-gray-300 to-gray-400 ring-gray-200';
  else if (index === 2) rankColor = 'bg-gradient-to-br from-yellow-800 to-yellow-900 ring-yellow-700';

  const careerTitle = career.careerName || career.career;

  return (
    <div className={`${cardBg} rounded-2xl shadow-lg border-t-8 border-transparent ${career.color.replace('from-', 'border-').replace('to-', 'border-')} p-6 transition-all duration-500 hover:shadow-2xl`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-xl ${rankColor} text-white ring-4`}>
            <span className="text-2xl font-black">{index + 1}</span>
          </div>
          <div>
            <h3 className={`text-3xl font-extrabold ${textClass} flex items-center gap-2`}>
              <span className="text-4xl">{career.icon}</span>
              {careerTitle}
            </h3>
            <p className={subtextClass}>{career.description}</p>
          </div>
        </div>
        {/* We no longer get a "score" from the AI, so this part is removed. */}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
        <StatCard icon={DollarSign} label="Salary (Avg)" value={career.salary} color="text-green-500" cardBg={darkMode ? 'bg-gray-700' : 'bg-green-50'} textClass={textClass} />
        <StatCard icon={BarChart3} label="Growth (Projected)" value={career.growth} color="text-indigo-500" cardBg={darkMode ? 'bg-gray-700' : 'bg-indigo-50'} textClass={textClass} />
        <StatCard icon={Zap} label="Required Skills" value={`${career.requiredSkills.length} Total`} color="text-purple-500" cardBg={darkMode ? 'bg-gray-700' : 'bg-purple-50'} textClass={textClass} />
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className={`w-full text-center py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex justify-center items-center gap-1 ${
          darkMode ? 'bg-gray-700 text-indigo-400 hover:bg-gray-600' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
        }`}
      >
        {showDetails ? 'Hide Details' : 'View Full Career Path'}
        <ChevronRight size={16} className={`transition-transform ${showDetails ? 'rotate-90' : 'rotate-0'}`} />
      </button>

      {showDetails && (
        <div className="mt-6 border-t pt-6 space-y-6">
          <p className={`${subtextClass} text-lg italic border-l-4 border-indigo-500 pl-4`}>"{career.detailedDesc}"</p>

          <div className={`${cardBg} p-5 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`text-xl font-bold mb-3 ${textClass} flex items-center gap-2`}>
              <BarChart3 size={20} className="text-indigo-500" />
              Skill Analysis
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Since the AI just gives us the career, we'll just show all required skills */}
              <SkillList
                title="Required Skills"
                skills={career.requiredSkills}
                color="bg-blue-100 text-blue-800"
              />
            </div>
          </div>

          <div className={`${cardBg} p-5 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`text-xl font-bold mb-4 ${textClass} flex items-center gap-2`}>
              <BookOpen size={20} className="text-purple-500" />
              Suggested Learning Path
            </h4>
            <div className="space-y-3">
              {career.courses.map((course, idx) => (
                <CourseCard key={idx} course={course} darkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerCard;