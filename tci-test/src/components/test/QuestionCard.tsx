import React from 'react';
import type { Question, AnswerValue } from '../../types';
import { Card } from '../common';
import LikertScale from './LikertScale';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedValue?: AnswerValue;
  onAnswer: (value: AnswerValue) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  selectedValue,
  onAnswer,
}) => {
  return (
    <Card className="animate-fade-in" padding="lg">
      <div className="space-y-8">
        {/* 문항 번호 및 텍스트 */}
        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
            Q{questionNumber}
          </span>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed text-balance">
            {question.text}
          </h2>
        </div>

        {/* 리커트 척도 */}
        <div className="pt-4">
          <LikertScale
            selectedValue={selectedValue}
            onSelect={onAnswer}
          />
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
