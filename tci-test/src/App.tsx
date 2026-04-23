import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestProvider } from './context/TestContext';

// 페이지 lazy loading
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const CoupleInvitePage = lazy(() => import('./pages/CoupleInvitePage'));
const CoupleResultPage = lazy(() => import('./pages/CoupleResultPage'));

// 로딩 컴포넌트
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">로딩 중...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TestProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/result" element={<ResultPage />} />
            {/* URL 파라미터 기반: /couple/invite/:code */}
            <Route path="/couple/invite/:code" element={<CoupleInvitePage />} />
            {/* URL 파라미터 기반: /couple/result/:code */}
            <Route path="/couple/result/:code" element={<CoupleResultPage />} />
          </Routes>
        </Suspense>
      </TestProvider>
    </BrowserRouter>
  );
};

export default App;
