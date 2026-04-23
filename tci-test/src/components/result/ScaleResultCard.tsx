import React from 'react';
import type { ScaleResult } from '../../types';
import { SCALES, SCALE_COLORS } from '../../data/scales';
import { Card } from '../common';

interface ScaleResultCardProps {
  result: ScaleResult;
}

const ScaleResultCard: React.FC<ScaleResultCardProps> = ({ result }) => {
  const scale = SCALES[result.scale];
  const color = SCALE_COLORS[result.scale];

  const getLevelBadge = () => {
    const levelStyles = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-green-100 text-green-700',
    };
    const levelLabels = {
      low: '낮음',
      medium: '보통',
      high: '높음',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelStyles[result.level]}`}>
        {levelLabels[result.level]}
      </span>
    );
  };

  return (
    <Card hover className="transition-all duration-200">
      <div className="space-y-4">
        {/* 헤더 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {scale.name}
                <span className="text-gray-400 font-normal ml-2 text-sm">
                  {scale.code}
                </span>
              </h3>
              <p className="text-xs text-gray-500">{scale.fullName}</p>
            </div>
          </div>
          {getLevelBadge()}
        </div>

        {/* 점수 바 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">점수</span>
            <span className="font-medium text-gray-900">
              {result.rawScore} / {result.maxScore} ({result.percentage}%)
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${result.percentage}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>

        {/* 해석 */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {result.interpretation}
        </p>

        {/* 카테고리 표시 */}
        <div className="pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {scale.category === 'temperament' ? '기질 척도' : '성격 척도'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ScaleResultCard;
