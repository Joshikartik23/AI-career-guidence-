import React from 'react';
import { BookOpen, ChevronRight, Award, Clock } from 'lucide-react';

function CourseCard({ course, darkMode }) {
  return (
    <a
      href={course.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-xl transition-all duration-300 ${
        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
      } border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
    >
      <div className="flex justify-between items-center">
        <h4 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'} flex items-center gap-2`}>
          <BookOpen size={18} className="text-indigo-500" />
          {course.title}
        </h4>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
      <div className="flex items-center justify-between text-sm mt-2">
        <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          <Award size={14} className="text-yellow-500" />
          {course.platform}
        </span>
        <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          <Clock size={14} className="text-pink-500" />
          {course.duration}
        </span>
      </div>
    </a>
  );
}

export default CourseCard;