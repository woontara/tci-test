import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { Layout } from '../components/layout';
import { Container, Button, Card } from '../components/common';
import { ProgressBar, QuestionCard, NavigationButtons } from '../components/test';
import { useTest } from '../context/TestContext';
import { ALL_QUESTIONS, TOTAL_QUESTIONS } from '../data/questions';
import { calculateTestResult } from '../utils/scoring';
import { addPartnerResult, getErrorMessage } from '../api';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPartnerMode = searchParams.get('mode') === 'partner';
  const coupleCode = searchParams.get('code'); // URL에서 커플 코드

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    state,
    currentQuestion,
    progress,
    canGoNext,
    canGoPrev,
    isLastQuestion,
    setAnswer,
    nextStep,
    prevStep,
    completeTest,
  } = useTest();

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && canGoNext && !isLastQuestion) {
        nextStep();
      } else if (e.key === 'ArrowLeft' && canGoPrev) {
        prevStep();
      } else if (e.key >= '1' && e.key <= '5') {
        const value = parseInt(e.key) as 1 | 2 | 3 | 4 | 5;
        if (currentQuestion) {
          setAnswer(currentQuestion.id, value);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoNext, canGoPrev, isLastQuestion, currentQuestion, setAnswer, nextStep, prevStep]);

  const handleComplete = async () => {
    const result = calculateTestResult(ALL_QUESTIONS, state.answers);
    completeTest(result);

    // 파트너 모드인 경우: API로 결과 저장
    if (isPartnerMode && coupleCode) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await addPartnerResult(coupleCode, result);
        // 백엔드에서 반환한 resultUrl 사용 또는 기본 경로로 이동
        if (response.resultUrl) {
          // resultUrl이 전체 URL인 경우 경로만 추출
          const url = new URL(response.resultUrl, window.location.origin);
          navigate(url.pathname);
        } else {
          navigate(`/couple/result/${coupleCode}`);
        }
        return;
      } catch (error) {
        setSubmitError(getErrorMessage(error));
        setIsSubmitting(false);
        return;
      }
    }

    navigate('/result');
  };

  const handleAnswer = (value: 1 | 2 | 3 | 4 | 5) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.id, value);
      // 자동으로 다음 문항으로 이동 (마지막 문항 제외)
      if (!isLastQuestion) {
        setTimeout(() => nextStep(), 300);
      }
    }
  };

  // 제출 중 화면
  if (isSubmitting) {
    return (
      <Layout showFooter={false}>
        <Container className="py-8">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">결과를 저장하는 중...</p>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  // 제출 에러 화면
  if (submitError) {
    return (
      <Layout showFooter={false}>
        <Container className="py-8">
          <Card className="text-center max-w-md mx-auto" padding="lg">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">오류가 발생했습니다</h1>
            <p className="text-gray-600 mb-6">{submitError}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                onClick={handleComplete}
              >
                다시 시도
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </Layout>
    );
  }

  if (!currentQuestion) {
    return (
      <Layout showFooter={false}>
        <Container className="py-8">
          <p>문항을 불러오는 중...</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        {/* 프로그레스 바 영역 */}
        <div className="bg-white border-b border-gray-100 py-4">
          <Container size="sm">
            <ProgressBar
              progress={progress}
              currentStep={state.currentStep}
              totalSteps={TOTAL_QUESTIONS}
            />
            {isPartnerMode && (
              <div className="mt-2 text-center">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-600">
                  커플 분석 모드
                </span>
              </div>
            )}
          </Container>
        </div>

        {/* 문항 영역 */}
        <div className="flex-1 flex items-center py-8">
          <Container size="sm" className="w-full">
            <QuestionCard
              question={currentQuestion}
              questionNumber={state.currentStep + 1}
              selectedValue={state.answers.get(currentQuestion.id)}
              onAnswer={handleAnswer}
            />
          </Container>
        </div>

        {/* 네비게이션 버튼 영역 */}
        <div className="bg-white border-t border-gray-100 py-4">
          <Container size="sm">
            <NavigationButtons
              onPrev={prevStep}
              onNext={nextStep}
              onComplete={handleComplete}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              isLastQuestion={isLastQuestion}
            />

            {/* 키보드 안내 (데스크톱) */}
            <div className="hidden sm:block mt-4 text-center">
              <p className="text-xs text-gray-400">
                키보드로 응답: 1-5 숫자키 | 이동: 좌우 화살표
              </p>
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
