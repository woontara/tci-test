import React, { useState } from 'react';
import { Heart, MessageCircle, TrendingUp, Calendar, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../common';
import { GENERAL_RELATIONSHIP_TIPS } from '../../data/coupleInterpretations';

interface RelationshipTipsProps {
  compatibilityType: 'complementary' | 'similar' | 'balanced';
  tips: string[];
}

const RelationshipTips: React.FC<RelationshipTipsProps> = ({
  compatibilityType,
  tips,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('primary');

  // 궁합 유형별 아이콘 및 색상
  const getTypeConfig = () => {
    switch (compatibilityType) {
      case 'complementary':
        return {
          icon: TrendingUp,
          color: 'purple',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          borderColor: 'border-purple-200',
          title: '상호보완 관계를 위한 조언',
        };
      case 'similar':
        return {
          icon: Heart,
          color: 'pink',
          bgColor: 'bg-pink-50',
          textColor: 'text-pink-700',
          borderColor: 'border-pink-200',
          title: '유사 성향 관계를 위한 조언',
        };
      case 'balanced':
        return {
          icon: Shield,
          color: 'blue',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          title: '균형 잡힌 관계를 위한 조언',
        };
    }
  };

  const typeConfig = getTypeConfig();
  const TypeIcon = typeConfig.icon;

  // 카테고리별 아이콘
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'communication':
        return MessageCircle;
      case 'growth':
        return TrendingUp;
      case 'daily':
        return Calendar;
      case 'conflict':
        return Shield;
      default:
        return Heart;
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-pink-500" />
        관계 조언
      </h2>

      {/* 주요 조언 (궁합 유형별) */}
      <Card
        className={`mb-4 ${typeConfig.bgColor} ${typeConfig.borderColor}`}
        padding="lg"
      >
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleCategory('primary')}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/70`}>
              <TypeIcon className={`w-5 h-5 ${typeConfig.textColor}`} />
            </div>
            <h3 className={`font-semibold ${typeConfig.textColor}`}>
              {typeConfig.title}
            </h3>
          </div>
          {expandedCategory === 'primary' ? (
            <ChevronUp className={`w-5 h-5 ${typeConfig.textColor}`} />
          ) : (
            <ChevronDown className={`w-5 h-5 ${typeConfig.textColor}`} />
          )}
        </div>

        {expandedCategory === 'primary' && (
          <ul className="mt-4 space-y-3">
            {tips.map((tip, index) => (
              <li
                key={index}
                className={`flex items-start gap-3 ${typeConfig.textColor}`}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/70 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* 일반 관계 조언 카테고리 */}
      <div className="space-y-3">
        {GENERAL_RELATIONSHIP_TIPS.map((category) => {
          const CategoryIcon = getCategoryIcon(category.category);
          const isExpanded = expandedCategory === category.category;

          return (
            <Card
              key={category.category}
              className="cursor-pointer hover:shadow-md transition-shadow"
              padding="md"
            >
              <div
                className="flex items-center justify-between"
                onClick={() => toggleCategory(category.category)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <CategoryIcon className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">{category.title}</h3>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {isExpanded && (
                <ul className="mt-4 space-y-2 pl-12">
                  {category.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-primary-500">-</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>

      {/* 하단 안내 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg text-center">
        <p className="text-sm text-gray-600">
          모든 관계는 노력과 이해로 성장합니다.<br />
          <span className="text-pink-600 font-medium">서로를 이해하고 존중하며 함께 나아가세요!</span>
        </p>
      </div>
    </div>
  );
};

export default RelationshipTips;
