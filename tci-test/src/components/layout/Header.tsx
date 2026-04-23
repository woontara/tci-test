import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { Container } from '../common';

const Header: React.FC = () => {
  const location = useLocation();
  const isTestPage = location.pathname === '/test';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
            <Brain className="w-8 h-8" />
            <span className="font-bold text-xl">TCI 검사</span>
          </Link>

          {!isTestPage && (
            <nav className="hidden sm:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                홈
              </Link>
              <Link
                to="/test"
                className="text-sm font-medium text-white bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                테스트 시작
              </Link>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
