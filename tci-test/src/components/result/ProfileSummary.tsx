import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Card } from '../common';

interface ProfileSummaryProps {
  temperamentProfile: string;
  characterProfile: string;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  temperamentProfile,
  characterProfile,
}) => {
  return (
    <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-white border-primary-100">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            당신의 TCI 프로필
          </h2>
          <p className="text-gray-500">
            기질과 성격 특성을 종합한 결과입니다
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* 기질 프로필 */}
          <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">기질 유형</h3>
                <p className="text-xs text-gray-500">Temperament</p>
              </div>
            </div>
            <p className="text-gray-700 font-medium">
              {temperamentProfile}
            </p>
          </div>

          {/* 성격 프로필 */}
          <div className="bg-white rounded-xl p-5 border border-violet-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">성격 유형</h3>
                <p className="text-xs text-gray-500">Character</p>
              </div>
            </div>
            <p className="text-gray-700 font-medium">
              {characterProfile}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSummary;
