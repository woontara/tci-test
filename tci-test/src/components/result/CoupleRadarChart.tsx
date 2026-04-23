import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { ScaleResult } from '../../types';
import { SCALES } from '../../data/scales';

// Chart.js 컴포넌트 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface CoupleRadarChartProps {
  results1: ScaleResult[];
  results2: ScaleResult[];
  name1?: string;
  name2?: string;
  className?: string;
}

const CoupleRadarChart: React.FC<CoupleRadarChartProps> = ({
  results1,
  results2,
  name1 = '파트너 1',
  name2 = '파트너 2',
  className = '',
}) => {
  // 척도 순서대로 정렬
  const scaleOrder = ['NS', 'HA', 'RD', 'P', 'SD', 'CO', 'ST'];

  const sortedResults1 = scaleOrder
    .map(code => results1.find(r => r.scale === code))
    .filter((r): r is ScaleResult => r !== undefined);

  const sortedResults2 = scaleOrder
    .map(code => results2.find(r => r.scale === code))
    .filter((r): r is ScaleResult => r !== undefined);

  const data = {
    labels: sortedResults1.map(r => SCALES[r.scale].name),
    datasets: [
      {
        label: name1,
        data: sortedResults1.map(r => r.percentage),
        backgroundColor: 'rgba(236, 72, 153, 0.2)', // pink
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(236, 72, 153, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: name2,
        data: sortedResults2.map(r => r.percentage),
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label?: string }; parsed: { r: number } }) => {
            return `${context.dataset.label}: ${context.parsed.r}%`;
          },
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          font: {
            size: 10,
          },
          color: '#9CA3AF',
          backdropColor: 'transparent',
        },
        pointLabels: {
          font: {
            size: 11,
            weight: 500,
          },
          color: '#374151',
        },
        grid: {
          color: '#E5E7EB',
        },
        angleLines: {
          color: '#E5E7EB',
        },
      },
    },
  };

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <Radar data={data} options={options} />

      {/* 범례 보조 설명 */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-500" />
          <span className="text-gray-600">{name1}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-gray-600">{name2}</span>
        </div>
      </div>
    </div>
  );
};

export default CoupleRadarChart;
