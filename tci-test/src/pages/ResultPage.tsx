import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Heart, Users, Loader2 } from 'lucide-react';
import { Layout } from '../components/layout';
import { Container, Button, Card } from '../components/common';
import { RadarChart, ScaleResultCard, ProfileSummary, ShareButtons } from '../components/result';
import { AdBanner } from '../components/ads';
import { useTest } from '../context/TestContext';
import { loadResultFromStorage } from '../utils/scoring';
import { createCoupleSession, getErrorMessage } from '../api';
import { TEMPERAMENT_SCALES, CHARACTER_SCALES } from '../data/scales';
import type { TestResult } from '../types';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, reset } = useTest();
  const [result, setResult] = useState<TestResult | null>(null);
  const [isCreatingCouple, setIsCreatingCouple] = useState(false);
  const [coupleError, setCoupleError] = useState<string | null>(null);

  useEffect(() => {
    // Context에서 결과 확인
    if (state.result) {
      setResult(state.result);
      return;
    }

    // sessionStorage에서 결과 확인
    const storedResult = loadResultFromStorage();
    if (storedResult) {
      setResult(storedResult);
      return;
    }

    // 결과가 없으면 테스트 페이지로 이동
    navigate('/test');
  }, [state.result, navigate]);

  const handleRetake = () => {
    reset();
    navigate('/test');
  };

  const handleCoupleAnalysis = async () => {
    if (!result) return;

    setIsCreatingCouple(true);
    setCoupleError(null);

    try {
      // API 호출하여 커플 세션 생성
      const { code } = await createCoupleSession(result);
      // 초대 페이지로 이동 (공유 모드)
      navigate(`/couple/invite/${code}?mode=share`);
    } catch (error) {
      setCoupleError(getErrorMessage(error));
      setIsCreatingCouple(false);
    }
  };

  if (!result) {
    return (
      <Layout>
        <Container className="py-8">
          <div className="text-center">
            <p className="text-gray-600">결과를 불러오는 중...</p>
          </div>
        </Container>
      </Layout>
    );
  }

  const temperamentResults = result.scales.filter(s =>
    TEMPERAMENT_SCALES.includes(s.scale)
  );
  const characterResults = result.scales.filter(s =>
    CHARACTER_SCALES.includes(s.scale)
  );

  return (
    <Layout>
      <div className="py-8 sm:py-12">
        <Container>
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              검사 결과
            </h1>
            <p className="text-gray-600">
              {(result.completedAt instanceof Date
                ? result.completedAt
                : new Date(result.completedAt)
              ).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} 완료
            </p>
          </div>

          {/* 광고 배너 (상단) */}
          <div className="mb-8">
            <AdBanner format="horizontal" />
          </div>

          {/* 프로필 요약 */}
          <div className="mb-8">
            <ProfileSummary
              temperamentProfile={result.temperamentProfile}
              characterProfile={result.characterProfile}
            />
          </div>

          {/* 레이더 차트 */}
          <Card className="mb-8" padding="lg">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
              척도별 점수 분포
            </h2>
            <RadarChart results={result.scales} />
          </Card>

          {/* 기질 척도 결과 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              기질 척도 결과
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {temperamentResults.map(r => (
                <ScaleResultCard key={r.scale} result={r} />
              ))}
            </div>
          </div>

          {/* 광고 배너 (중간) */}
          <div className="my-8">
            <AdBanner format="rectangle" />
          </div>

          {/* 성격 척도 결과 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-violet-500" />
              성격 척도 결과
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {characterResults.map(r => (
                <ScaleResultCard key={r.scale} result={r} />
              ))}
            </div>
          </div>

          {/* 공유 버튼 */}
          <Card className="mb-8" padding="lg">
            <ShareButtons result={result} />
          </Card>

          {/* 파트너와 함께 분석하기 섹션 */}
          <Card className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200" padding="lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm mb-4">
                <Heart className="w-7 h-7 text-pink-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                파트너와 함께 분석하기
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                파트너도 테스트를 완료하면 두 분의 성격 궁합을 분석해드립니다.
                관계의 강점과 성장 포인트를 확인해보세요!
              </p>
              {coupleError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {coupleError}
                </div>
              )}
              <Button
                variant="primary"
                size="lg"
                onClick={handleCoupleAnalysis}
                disabled={isCreatingCouple}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingCouple ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    커플 분석 시작하기
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* 다시 테스트 */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              다시 테스트하기
            </Button>
          </div>

          {/* 안내 문구 */}
          <div className="mt-12 text-center">
            <Card className="inline-block" padding="md">
              <p className="text-sm text-gray-500">
                본 검사는 간소화된 무료 버전입니다.
                <br />
                정확한 진단을 위해서는 전문가와 상담하시기 바랍니다.
              </p>
            </Card>
          </div>

          {/* 광고 배너 (하단) */}
          <div className="mt-8">
            <AdBanner format="horizontal" />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default ResultPage;
