import React from 'react';
import type { AnswerValue } from '../../types';
import { LIKERT_OPTIONS } from '../../data/questions';

interface LikertScaleProps {
  selectedValue?: AnswerValue;
  onSelect: (value: AnswerValue) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="w-full">
      {/* 모바일: 세로 배치 */}
      <div className="flex flex-col gap-3 sm:hidden">
        {LIKERT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedValue === option.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedValue === option.value
                  ? 'border-primary-600 bg-primary-600'
                  : 'border-gray-300'
              }`}
            >
              {selectedValue === option.value && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span
              className={`font-medium ${
                selectedValue === option.value
                  ? 'text-primary-700'
                  : 'text-gray-700'
              }`}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* 태블릿/데스크톱: 가로 배치 */}
      <div className="hidden sm:block">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm text-gray-500">전혀 아니다</span>
          <span className="text-sm text-gray-500">매우 그렇다</span>
        </div>
        <div className="flex justify-between gap-2">
          {LIKERT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`likert-option flex-1 aspect-square max-w-16 ${
                selectedValue === option.value ? 'selected' : ''
              }`}
              title={option.label}
            >
              <span className="font-semibold">{option.value}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {LIKERT_OPTIONS.map((option) => (
            <div
              key={option.value}
              className="flex-1 text-center"
            >
              <span
                className={`text-xs ${
                  selectedValue === option.value
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikertScale;
