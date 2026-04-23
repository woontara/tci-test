import React from 'react';
import { Card } from '../common';
import { SCALES, SCALE_COLORS } from '../../data/scales';
import { COUPLE_SCALE_INTERPRETATIONS, getLevelCombination } from '../../data/coupleInterpretations';
import type { ScaleCode, Level } from '../../types';

interface PersonData {
  name: string;
  percentage: number;
  level: Level;
}

interface CoupleComparisonCardProps {
  scaleCode: ScaleCode;
  person1: PersonData;
  person2: PersonData;
}

const CoupleComparisonCard: React.FC<CoupleComparisonCardProps> = ({
  scaleCode,
  person1,
  person2,
}) => {
  const scale = SCALES[scaleCode];
  const scaleColor = SCALE_COLORS[scaleCode];
  const interpretation = COUPLE_SCALE_INTERPRETATIONS[scaleCode];

  // 수준 조합 판단
  const combination = getLevelCombination(person1.level, person2.level);
  const combinationText = combination === 'similar'
    ? interpretation.similar
    : interpretation.combinations[combination as keyof typeof interpretation.combinations] || interpretation.similar;

  // 차이 계산
  const difference = Math.abs(person1.percentage - person2.percentage);
  const isDifferent = difference > 20;

  // 수준 한글 변환
  const getLevelText = (level: Level): string => {
    switch (level) {
      case 'high': return '높음';
      case 'medium': return '중간';
      case 'low': return '낮음';
    }
  };

  return (
    <Card padding="md" className="overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: scaleColor }}
        />
        <div>
          <h3 className="font-semibold text-gray-900">{scale.name}</h3>
          <p className="text-xs text-gray-500">{scale.fullName}</p>
        </div>
        {isDifferent && (
          <span className="ml-auto px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
            상호보완
          </span>
        )}
        {!isDifferent && (
          <span className="ml-auto px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
            유사
          </span>
        )}
      </div>

      {/* 점수 비교 바 */}
      <div className="space-y-3 mb-4">
        {/* Person 1 */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{person1.name}</span>
            <span className="font-medium text-pink-600">
              {person1.percentage}% ({getLevelText(person1.level)})
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${person1.percentage}%`,
                backgroundColor: 'rgb(236, 72, 153)', // pink-500
              }}
            />
          </div>
        </div>

        {/* Person 2 */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{person2.name}</span>
            <span className="font-medium text-blue-600">
              {person2.percentage}% ({getLevelText(person2.level)})
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${person2.percentage}%`,
                backgroundColor: 'rgb(59, 130, 246)', // blue-500
              }}
            />
          </div>
        </div>
      </div>

      {/* 차이 시각화 */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-500">차이</span>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              difference <= 15
                ? 'bg-green-400'
                : difference <= 30
                ? 'bg-amber-400'
                : 'bg-red-400'
            }`}
            style={{ width: `${Math.min(difference, 100)}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-700">{difference}%</span>
      </div>

      {/* 해석 */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {combinationText}
      </p>
    </Card>
  );
};

export default CoupleComparisonCard;
