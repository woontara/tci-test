import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Heart, Copy, Check, MessageCircle, Send, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { Layout } from '../components/layout';
import { Container, Button, Card } from '../components/common';
import { getCoupleData, getErrorMessage } from '../api';
import { copyToClipboard } from '../utils/share';
import type { TestResult } from '../types';

const CoupleInvitePage: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [inviterResult, setInviterResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const fetchCoupleData = async () => {
      if (!code) {
        setError('유효하지 않은 초대 링크입니다.');
        setLoading(false);
        return;
      }

      try {
        const { person1Result, person2Result } = await getCoupleData(code);

        // 이미 파트너가 완료한 경우 결과 페이지로 이동
        if (person2Result) {
          navigate(`/couple/result/${code}`);
          return;
        }

        setInviterResult(person1Result);
        setLoading(false);
      } catch (err) {
        setError(getErrorMessage(err));
        setLoading(false);
      }
    };

    fetchCoupleData();
  }, [code, navigate]);

  // 현재 페이지 URL (공유용)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKakaoShare = () => {
    if (!inviterResult) return;

    const message = `TCI 기질 및 성격 검사 - 커플 분석\n\n파트너님이 함께 검사 결과를 분석해보자고 초대했어요!\n\n테스트 완료 후 두 분의 궁합을 확인해보세요.`;

    if (typeof window !== 'undefined' && (window as unknown as { Kakao?: { Share?: { sendDefault: (options: unknown) => void } } }).Kakao?.Share) {
      const Kakao = (window as unknown as { Kakao: { Share: { sendDefault: (options: unknown) => void } } }).Kakao;
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'TCI 커플 분석에 초대되었어요!',
          description: message,
          imageUrl: `${window.location.origin}/og-image.png`,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '테스트 시작하기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      copyToClipboard(`${message}\n\n${shareUrl}`);
      alert('카카오톡 공유 기능을 사용하려면 SDK가 필요합니다. 대신 내용이 클립보드에 복사되었습니다.');
    }
  };

  const handleSmsShare = () => {
    if (!inviterResult) return;
    const message = `우리 궁합 테스트 해볼래? 나는 이미 했어! ${shareUrl}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  const handleStartPartnerTest = () => {
    if (!code) return;
    navigate(`/test?mode=partner&code=${code}`);
  };

  if (loading) {
    return (
      <Layout>
        <Container className="py-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">초대장을 불러오는 중...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">오류가 발생했습니다</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/">
              <Button variant="primary">홈으로 돌아가기</Button>
            </Link>
          </Card>
        </Container>
      </Layout>
    );
  }

  if (!inviterResult) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col justify-center py-8 sm:py-12">
        <Container className="max-w-lg">
          {/* 히어로 섹션 */}
          <div className="text-center mb-8">
            {/* 하트 애니메이션 */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg">
                <Heart className="w-12 h-12 text-white fill-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              커플 궁합 분석에<br />초대받았어요!
            </h1>
            <p className="text-gray-600 text-lg">
              파트너가 당신과의 궁합이 궁금해하고 있어요
            </p>
          </div>

          {/* 파트너 프로필 티저 */}
          <Card className="mb-6 bg-gradient-to-br from-pink-50 via-white to-purple-50 border-pink-100" padding="lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-pink-600 mb-1">
                  파트너의 성격 유형
                </p>
                <p className="text-gray-800 font-medium leading-relaxed">
                  {inviterResult.temperamentProfile}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  테스트를 완료하면 궁합 분석을 볼 수 있어요
                </p>
              </div>
            </div>
          </Card>

          {/* 메인 CTA */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartPartnerTest}
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25 mb-4"
          >
            나도 테스트하기
          </Button>

          {/* 소요 시간 안내 */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-8">
            <Clock className="w-4 h-4" />
            <span>약 5-10분 소요 · 98문항</span>
          </div>

          {/* 공유 옵션 (접혀있음) */}
          <div className="border-t border-gray-100 pt-6">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              {showShareOptions ? '닫기' : '다른 사람에게 이 초대 공유하기'}
            </button>

            {showShareOptions && (
              <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* 링크 복사 */}
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-green-600">복사완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">링크 복사</span>
                    </>
                  )}
                </button>

                {/* 공유 버튼들 */}
                <div className="flex gap-3">
                  <button
                    onClick={handleKakaoShare}
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-[#FEE500] hover:bg-[#F5DC00] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-[#391B1B]" />
                    <span className="text-[#391B1B] font-medium">카카오톡</span>
                  </button>
                  <button
                    onClick={handleSmsShare}
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
                  >
                    <Send className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">문자</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 하단 안내 */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              두 분 모두 테스트를 완료하면<br />
              관계의 강점과 성장 포인트를 알려드려요
            </p>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default CoupleInvitePage;
