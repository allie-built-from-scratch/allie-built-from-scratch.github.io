import React from 'react';

interface StatBarProps {
  name: string;
  value: number;
  maxValue: number;
}

const StatBar: React.FC<StatBarProps> = ({ name, value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="stat-bar">
      <span className="stat-name">{name}: {value}/{maxValue}</span>
      <div className="stat-container">
        <div 
          className="stat-value" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;