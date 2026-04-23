import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import type { TestState, TestAction, AnswerValue, TestResult } from '../types';
import { saveAnswersToStorage, loadAnswersFromStorage, saveResultToStorage, clearStorage } from '../utils/scoring';
import { ALL_QUESTIONS, TOTAL_QUESTIONS } from '../data/questions';

// 초기 상태
const initialState: TestState = {
  currentStep: 0,
  answers: new Map<number, AnswerValue>(),
  isCompleted: false,
  result: null,
};

// 리듀서
const testReducer = (state: TestState, action: TestAction): TestState => {
  switch (action.type) {
    case 'SET_ANSWER': {
      const newAnswers = new Map(state.answers);
      newAnswers.set(action.questionId, action.value);
      return {
        ...state,
        answers: newAnswers,
      };
    }
    case 'NEXT_STEP': {
      const nextStep = Math.min(state.currentStep + 1, TOTAL_QUESTIONS - 1);
      return {
        ...state,
        currentStep: nextStep,
      };
    }
    case 'PREV_STEP': {
      const prevStep = Math.max(state.currentStep - 1, 0);
      return {
        ...state,
        currentStep: prevStep,
      };
    }
    case 'GO_TO_STEP': {
      const step = Math.max(0, Math.min(action.step, TOTAL_QUESTIONS - 1));
      return {
        ...state,
        currentStep: step,
      };
    }
    case 'COMPLETE_TEST': {
      return {
        ...state,
        isCompleted: true,
        result: action.result,
      };
    }
    case 'RESET': {
      clearStorage();
      return {
        ...initialState,
        answers: new Map<number, AnswerValue>(),
      };
    }
    case 'LOAD_STATE': {
      return {
        ...state,
        ...action.state,
        answers: action.state.answers || state.answers,
      };
    }
    default:
      return state;
  }
};

// Context 타입
interface TestContextType {
  state: TestState;
  // Actions
  setAnswer: (questionId: number, value: AnswerValue) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeTest: (result: TestResult) => void;
  reset: () => void;
  // Computed
  currentQuestion: typeof ALL_QUESTIONS[0] | null;
  progress: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLastQuestion: boolean;
  allQuestionsAnswered: boolean;
}

const TestContext = createContext<TestContextType | null>(null);

// Provider 컴포넌트
interface TestProviderProps {
  children: ReactNode;
}

export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, initialState);

  // 컴포넌트 마운트 시 저장된 데이터 불러오기
  useEffect(() => {
    const savedData = loadAnswersFromStorage();
    if (savedData) {
      dispatch({
        type: 'LOAD_STATE',
        state: {
          answers: savedData.answers,
          currentStep: savedData.currentStep,
        },
      });
    }
  }, []);

  // 응답 변경 시 저장
  useEffect(() => {
    if (state.answers.size > 0) {
      saveAnswersToStorage(state.answers, state.currentStep);
    }
  }, [state.answers, state.currentStep]);

  // 결과 저장
  useEffect(() => {
    if (state.result) {
      saveResultToStorage(state.result);
    }
  }, [state.result]);

  // Actions
  const setAnswer = useCallback((questionId: number, value: AnswerValue) => {
    dispatch({ type: 'SET_ANSWER', questionId, value });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'GO_TO_STEP', step });
  }, []);

  const completeTest = useCallback((result: TestResult) => {
    dispatch({ type: 'COMPLETE_TEST', result });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // Computed values
  const currentQuestion = ALL_QUESTIONS[state.currentStep] || null;
  const progress = ((state.currentStep + 1) / TOTAL_QUESTIONS) * 100;
  const currentAnswer = currentQuestion ? state.answers.get(currentQuestion.id) : undefined;
  const canGoNext = !!currentAnswer;
  const canGoPrev = state.currentStep > 0;
  const isLastQuestion = state.currentStep === TOTAL_QUESTIONS - 1;
  const allQuestionsAnswered = state.answers.size === TOTAL_QUESTIONS;

  const value: TestContextType = {
    state,
    setAnswer,
    nextStep,
    prevStep,
    goToStep,
    completeTest,
    reset,
    currentQuestion,
    progress,
    canGoNext,
    canGoPrev,
    isLastQuestion,
    allQuestionsAnswered,
  };

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  );
};

// Hook
export const useTest = (): TestContextType => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};

export default TestContext;
