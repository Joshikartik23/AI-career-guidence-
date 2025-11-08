import React from 'react';

function SkillList({ title, skills, color }) {
  return (
    <div className="space-y-2">
      <h5 className="text-md font-semibold text-gray-700 dark:text-gray-300">{title}</h5>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className={`${color} px-3 py-1 rounded-full text-xs font-medium`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillList;