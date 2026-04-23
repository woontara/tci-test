import { useMemo } from 'react';
import type { TestResult, ScaleCode } from '../types';
import { TEMPERAMENT_SCALES, CHARACTER_SCALES } from '../data/scales';

interface UseResultReturn {
  temperamentResults: TestResult['scales'];
  characterResults: TestResult['scales'];
  topScales: TestResult['scales'];
  averageScore: number;
  getScaleByCode: (code: ScaleCode) => TestResult['scales'][0] | undefined;
}

export const useResult = (result: TestResult | null): UseResultReturn => {
  const temperamentResults = useMemo(() => {
    if (!result) return [];
    return result.scales.filter(s => TEMPERAMENT_SCALES.includes(s.scale));
  }, [result]);

  const characterResults = useMemo(() => {
    if (!result) return [];
    return result.scales.filter(s => CHARACTER_SCALES.includes(s.scale));
  }, [result]);

  const topScales = useMemo(() => {
    if (!result) return [];
    return [...result.scales]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);
  }, [result]);

  const averageScore = useMemo(() => {
    if (!result || result.scales.length === 0) return 0;
    const total = result.scales.reduce((sum, s) => sum + s.percentage, 0);
    return Math.round(total / result.scales.length);
  }, [result]);

  const getScaleByCode = (code: ScaleCode) => {
    if (!result) return undefined;
    return result.scales.find(s => s.scale === code);
  };

  return {
    temperamentResults,
    characterResults,
    topScales,
    averageScore,
    getScaleByCode,
  };
};

export default useResult;
