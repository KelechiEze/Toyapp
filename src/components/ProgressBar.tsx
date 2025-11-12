
import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          >
            <div className="progress-shine"></div>
          </div>
        </div>
        <div className="progress-glow"></div>
      </div>
      <div className="progress-text">
        <span className="progress-percentage">{Math.round(progress)}%</span>
        <span className="progress-label">Initializing</span>
      </div>
    </div>
  );
};

export default ProgressBar;
