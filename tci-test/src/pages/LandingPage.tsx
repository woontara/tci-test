import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Clock, BarChart3, Shield } from 'lucide-react';
import { Layout } from '../components/layout';
import { Container, Button, Card } from '../components/common';
import { AdBanner } from '../components/ads';
import { SCALE_LIST, TEMPERAMENT_SCALES, CHARACTER_SCALES } from '../data/scales';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              <span>무료 TCI 검사</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              나의 <span className="text-primary-600">기질</span>과{' '}
              <span className="text-primary-600">성격</span>을<br />
              알아보세요
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              TCI(기질 및 성격 검사)는 Cloninger 박사가 개발한 심리검사로,
              <br className="hidden sm:block" />
              선천적인 기질과 후천적으로 발달한 성격 특성을 측정합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/test">
                <Button size="lg" className="group">
                  <span>테스트 시작하기</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* 특징 */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600">약 5분</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600">35문항</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600">무료</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TCI 소개 */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              TCI 검사란?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TCI는 7개의 척도를 통해 개인의 기질과 성격 특성을 종합적으로 분석합니다.
            </p>
          </div>

          {/* 기질 척도 */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              기질 척도 (Temperament)
            </h3>
            <p className="text-gray-600 mb-6">
              선천적으로 타고난 자동적인 반응 패턴으로, 유전적 요인에 의해 주로 결정됩니다.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TEMPERAMENT_SCALES.map(code => {
                const scale = SCALE_LIST.find(s => s.code === code)!;
                return (
                  <Card key={code} hover>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {scale.name}
                      <span className="text-gray-400 font-normal ml-2 text-sm">
                        {scale.code}
                      </span>
                    </h4>
                    <p className="text-sm text-gray-600">{scale.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 성격 척도 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-violet-500" />
              성격 척도 (Character)
            </h3>
            <p className="text-gray-600 mb-6">
              후천적으로 발달하는 특성으로, 환경과 경험을 통해 형성됩니다.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {CHARACTER_SCALES.map(code => {
                const scale = SCALE_LIST.find(s => s.code === code)!;
                return (
                  <Card key={code} hover>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {scale.name}
                      <span className="text-gray-400 font-normal ml-2 text-sm">
                        {scale.code}
                      </span>
                    </h4>
                    <p className="text-sm text-gray-600">{scale.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 광고 배너 */}
      <section className="py-8 bg-gray-50">
        <Container size="sm">
          <AdBanner format="horizontal" className="mx-auto" />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              약 5분이면 나의 기질과 성격 유형을 알 수 있습니다.
              결과는 레이더 차트와 함께 상세하게 제공됩니다.
            </p>
            <Link to="/test">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
              >
                테스트 시작하기
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default LandingPage;
