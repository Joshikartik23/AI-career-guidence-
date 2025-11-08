import React, { useState } from 'react';
import { User, Zap, Star, Sparkles, ChevronRight } from 'lucide-react';

function ProfileForm({ userData, setUserData, onSubmit, darkMode, cardBg, textClass, subtextClass }) {
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  function addSkill() {
    if (skillInput.trim() && !userData.skills.includes(skillInput.trim())) {
      setUserData({ ...userData, skills: [...userData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  }
  
  function addInterest() {
    if (interestInput.trim() && !userData.interests.includes(interestInput.trim())) {
      setUserData({ ...userData, interests: [...userData.interests, interestInput.trim()] });
      setInterestInput('');
    }
  }
  
  function removeSkill(skill) {
    setUserData({ ...userData, skills: userData.skills.filter(s => s !== skill) });
  }
  
  function removeInterest(interest) {
    setUserData({ ...userData, interests: userData.interests.filter(i => i !== interest) });
  }

  const canSubmit = userData.name && userData.education && 
                     userData.skills.length > 0 && userData.interests.length > 0;

  const progressSteps = [
    { label: 'Basic Info', complete: userData.name && userData.education },
    { label: 'Skills', complete: userData.skills.length > 0 },
    { label: 'Interests', complete: userData.interests.length > 0 }
  ];

  const completedSteps = progressSteps.filter(s => s.complete).length;
  const progressPercent = (completedSteps / progressSteps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className={`${cardBg} rounded-2xl shadow-lg p-6 mb-6`}>
        <div className="flex justify-between items-center mb-4">
          {progressSteps.map((step, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`flex items-center gap-2 ${step.complete ? 'text-green-600' : subtextClass}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  step.complete ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {step.complete ? '✓' : idx + 1}
                </div>
                <span className="hidden md:inline text-sm font-medium">{step.label}</span>
              </div>
              {idx < progressSteps.length - 1 && (
                <div className={`h-1 w-12 mx-2 ${step.complete ? 'bg-green-600' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <div className={`${cardBg} rounded-2xl shadow-xl p-8`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl">
            <User className="text-white" size={28} />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${textClass}`}>Build Your Profile</h2>
            <p className={subtextClass}>Tell us about yourself to get personalized recommendations</p>
          </div>
        </div>
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${textClass}`}>
              What's your name? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              placeholder="e.g., John Doe"
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                darkMode ? 'bg-gray-700 border-gray-600 focus:border-indigo-500' : 'bg-gray-50 border-gray-200 focus:border-indigo-500'
              } focus:ring-2 focus:ring-indigo-200 outline-none transition-all`}
            />
          </div>

          {/* Education */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${textClass}`}>
              What's your education level? <span className="text-red-500">*</span>
            </label>
            <select
              value={userData.education}
              onChange={(e) => setUserData({ ...userData, education: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                darkMode ? 'bg-gray-700 border-gray-600 focus:border-indigo-500' : 'bg-gray-50 border-gray-200 focus:border-indigo-500'
              } focus:ring-2 focus:ring-indigo-200 outline-none transition-all`}
            >
              <option value="">Choose your education level</option>
              <option value="High School">🎓 High School</option>
              <option value="Bachelor's">📚 Bachelor's Degree</option>
              <option value="Master's">🎯 Master's Degree</option>
              <option value="PhD">🏆 PhD</option>
              <option value="Bootcamp">💻 Coding Bootcamp</option>
              <option value="Self-Taught">🚀 Self-Taught</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${textClass}`}>
              What skills do you have? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Type a skill and press Enter (e.g., JavaScript, Design)"
                className={`flex-1 px-4 py-3 rounded-xl border-2 ${
                  darkMode ? 'bg-gray-700 border-gray-600 focus:border-purple-500' : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                } focus:ring-2 focus:ring-purple-200 outline-none transition-all`}
              />
              <button
                onClick={addSkill}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map(skill => (
                <span
                  key={skill}
                  className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:shadow-md transition-shadow"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-purple-600 font-bold">
                    ×
                  </button>
                </span>
              ))}
            </div>
            {userData.skills.length === 0 && (
              <p className={`text-sm mt-2 ${subtextClass} flex items-center gap-2`}>
                <Zap size={16} className="text-yellow-500" />
                Add skills like JavaScript, Python, Design, Marketing, etc.
              </p>
            )}
          </div>

          {/* Interests */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${textClass}`}>
              What are you interested in? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                placeholder="Type an interest and press Enter (e.g., Web Development)"
                className={`flex-1 px-4 py-3 rounded-xl border-2 ${
                  darkMode ? 'bg-gray-700 border-gray-600 focus:border-green-500' : 'bg-gray-50 border-gray-200 focus:border-green-500'
                } focus:ring-2 focus:ring-green-200 outline-none transition-all`}
              />
              <button
                onClick={addInterest}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {userData.interests.map(interest => (
                <span
                  key={interest}
                  className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:shadow-md transition-shadow"
                >
                  {interest}
                  <button onClick={() => removeInterest(interest)} className="hover:text-green-600 font-bold">
                    ×
                  </button>
                </span>
              ))}
            </div>
            {userData.interests.length === 0 && (
              <p className={`text-sm mt-2 ${subtextClass} flex items-center gap-2`}>
                <Star size={16} className="text-yellow-500" />
                Add interests like Data Science, Mobile Apps, UI/UX Design, etc.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              canSubmit 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:scale-105 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <Sparkles size={20} />
            Generate My Career Recommendations
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;