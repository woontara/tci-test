import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '../common';

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  onComplete: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  onComplete,
  canGoPrev,
  canGoNext,
  isLastQuestion,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">이전</span>
      </Button>

      {isLastQuestion ? (
        <Button
          variant="primary"
          onClick={onComplete}
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>결과 보기</span>
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          <span className="hidden sm:inline">다음</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
