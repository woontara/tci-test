import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          진행률
        </span>
        <span className="text-sm font-medium text-primary-600">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-1 text-right">
        <span className="text-xs text-gray-400">
          {Math.round(progress)}% 완료
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
