import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Users, ArrowRight, RefreshCw, Share2, AlertCircle, Clock } from 'lucide-react';
import { Layout } from '../components/layout';
import { Container, Button, Card } from '../components/common';
import { CoupleRadarChart, CoupleComparisonCard, RelationshipTips } from '../components/result';
import { AdBanner } from '../components/ads';
import { getCoupleData, getErrorMessage } from '../api';
import { copyToClipboard } from '../utils/share';
import {
  determineCompatibilityType,
  COMPATIBILITY_INTERPRETATIONS,
} from '../data/coupleInterpretations';
import type { TestResult, ScaleCode } from '../types';

const CoupleResultPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [person1Result, setPerson1Result] = useState<TestResult | null>(null);
  const [person2Result, setPerson2Result] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCoupleData = async () => {
      if (!code) {
        setError('유효하지 않은 결과 링크입니다.');
        setLoading(false);
        return;
      }

      try {
        const { person1Result: p1, person2Result: p2 } = await getCoupleData(code);

        setPerson1Result(p1);

        if (p2) {
          setPerson2Result(p2);
        } else {
          // 아직 파트너가 완료하지 않음
          setIsWaiting(true);
        }

        setLoading(false);
      } catch (err) {
        setError(getErrorMessage(err));
        setLoading(false);
      }
    };

    fetchCoupleData();
  }, [code]);

  // 현재 페이지 URL (공유용)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const inviteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/couple/invite/${code}`
    : '';

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyInviteLink = async () => {
    const success = await copyToClipboard(inviteUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container className="py-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">커플 분석 결과를 불러오는 중...</p>
          </div>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="py-8">
          <Card className="text-center" padding="lg">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">결과를 확인할 수 없습니다</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/">
              <Button variant="primary">홈으로 돌아가기</Button>
            </Link>
          </Card>
        </Container>
      </Layout>
    );
  }

  // 파트너 대기 중 화면
  if (isWaiting && person1Result) {
    return (
      <Layout>
        <Container className="py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              파트너를 기다리는 중
            </h1>
            <p className="text-gray-600">
              파트너가 테스트를 완료하면 결과를 확인할 수 있습니다.
            </p>
          </div>

          {/* 커플 코드 표시 */}
          <Card className="mb-6 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200" padding="md">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">커플 코드</p>
              <p className="text-2xl font-bold text-pink-600 font-mono">{code}</p>
            </div>
          </Card>

          {/* 초대 링크 공유 */}
          <Card className="mb-6" padding="lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              파트너에게 초대 링크를 보내세요
            </h2>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-4">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none truncate"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyInviteLink}
                className="flex items-center gap-1 whitespace-nowrap"
              >
                {copied ? '복사됨!' : '복사'}
              </Button>
            </div>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              결과 다시 확인하기
            </Button>
          </Card>

          {/* 내 결과 미리보기 */}
          <Card className="mb-6" padding="lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              내 검사 결과
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium">
                {person1Result.temperamentProfile}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {person1Result.characterProfile}
              </p>
            </div>
          </Card>

          <div className="text-center">
            <Link to="/">
              <Button variant="outline">홈으로 돌아가기</Button>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  if (!person1Result || !person2Result) {
    return null;
  }

  const person1Scales = person1Result.scales.map(s => ({
    scale: s.scale,
    level: s.level,
    percentage: s.percentage,
  }));

  const person2Scales = person2Result.scales.map(s => ({
    scale: s.scale,
    level: s.level,
    percentage: s.percentage,
  }));

  const compatibilityType = determineCompatibilityType(person1Scales, person2Scales);
  const compatibility = COMPATIBILITY_INTERPRETATIONS[compatibilityType];

  const person1Name = '파트너 1';
  const person2Name = '파트너 2';

  return (
    <Layout>
      <div className="py-8 sm:py-12">
        <Container>
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-4">
              <Heart className="w-10 h-10 text-pink-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              커플 분석 결과
            </h1>
            <p className="text-gray-600">
              {person1Name} & {person2Name}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              커플 코드: {code}
            </p>
          </div>

          {/* 광고 배너 */}
          <div className="mb-8">
            <AdBanner format="horizontal" />
          </div>

          {/* 궁합 유형 카드 */}
          <Card className="mb-8 overflow-hidden" padding="none">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-3">
                <Users className="w-4 h-4" />
                두 분의 궁합
              </div>
              <h2 className="text-2xl font-bold mb-2">{compatibility.title}</h2>
              <p className="text-white/90 max-w-lg mx-auto">
                {compatibility.description}
              </p>
            </div>
          </Card>

          {/* 레이더 차트 비교 */}
          <Card className="mb-8" padding="lg">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
              척도별 점수 비교
            </h2>
            <CoupleRadarChart
              results1={person1Result.scales}
              results2={person2Result.scales}
              name1={person1Name}
              name2={person2Name}
            />
          </Card>

          {/* 프로필 비교 */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card padding="lg" className="border-l-4 border-l-pink-500">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500" />
                {person1Name}
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">기질:</span> {person1Result.temperamentProfile}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">성격:</span> {person1Result.characterProfile}
                </p>
              </div>
            </Card>
            <Card padding="lg" className="border-l-4 border-l-blue-500">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                {person2Name}
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">기질:</span> {person2Result.temperamentProfile}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">성격:</span> {person2Result.characterProfile}
                </p>
              </div>
            </Card>
          </div>

          {/* 관계 강점 & 주의점 */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card padding="lg" className="bg-green-50 border-green-200">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                <span className="text-xl">+</span>
                관계의 강점
              </h3>
              <ul className="space-y-2">
                {compatibility.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {strength}
                  </li>
                ))}
              </ul>
            </Card>
            <Card padding="lg" className="bg-amber-50 border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                <span className="text-xl">!</span>
                주의할 점
              </h3>
              <ul className="space-y-2">
                {compatibility.cautions.map((caution, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {caution}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* 광고 배너 */}
          <div className="my-8">
            <AdBanner format="rectangle" />
          </div>

          {/* 척도별 비교 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              척도별 상세 비교
            </h2>
            <div className="space-y-4">
              {person1Result.scales.map(scale1 => {
                const scale2 = person2Result.scales.find(
                  s => s.scale === scale1.scale
                );
                if (!scale2) return null;

                return (
                  <CoupleComparisonCard
                    key={scale1.scale}
                    scaleCode={scale1.scale as ScaleCode}
                    person1={{
                      name: person1Name,
                      percentage: scale1.percentage,
                      level: scale1.level,
                    }}
                    person2={{
                      name: person2Name,
                      percentage: scale2.percentage,
                      level: scale2.level,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* 관계 조언 */}
          <RelationshipTips
            compatibilityType={compatibilityType}
            tips={compatibility.tips}
          />

          {/* 공유 및 액션 버튼 */}
          <Card className="mb-8" padding="lg">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                {copied ? '링크 복사됨!' : '결과 링크 공유'}
              </Button>
              <Link to="/">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 w-full"
                >
                  <RefreshCw className="w-5 h-5" />
                  새 테스트 시작
                </Button>
              </Link>
            </div>
          </Card>

          {/* 안내 문구 */}
          <div className="text-center">
            <Card className="inline-block" padding="md">
              <p className="text-sm text-gray-500">
                본 검사는 간소화된 무료 버전입니다.<br />
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

export default CoupleResultPage;
