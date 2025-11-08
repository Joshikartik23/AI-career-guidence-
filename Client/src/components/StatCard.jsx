import React from 'react';

function StatCard({ icon: Icon, label, value, color, cardBg, textClass }) {
  return (
    <div className={`p-4 rounded-xl ${cardBg} flex items-center justify-center space-x-3`}>
      <Icon size={24} className={color} />
      <div>
        <p className={`text-sm font-medium ${textClass}`}>{label}</p>
        <p className={`text-lg font-bold ${textClass}`}>{value}</p>
      </div>
    </div>
  );
}

export default StatCard;