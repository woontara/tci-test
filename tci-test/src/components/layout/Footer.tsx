import React from 'react';
import { Container } from '../common';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-auto">
      <Container>
        <div className="text-center">
          <p className="text-sm text-gray-500">
            TCI(기질 및 성격 검사)는 Cloninger 박사가 개발한 검사입니다.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            본 검사는 간소화된 무료 버전으로, 정확한 진단을 위해서는 전문가와 상담하시기 바랍니다.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            &copy; {currentYear} TCI Test. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
