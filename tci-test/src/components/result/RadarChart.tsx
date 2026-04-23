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
import { SCALES, SCALE_COLORS } from '../../data/scales';

// Chart.js 컴포넌트 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  results: ScaleResult[];
  className?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ results, className = '' }) => {
  // 척도 순서대로 정렬
  const sortedResults = ['NS', 'HA', 'RD', 'P', 'SD', 'CO', 'ST']
    .map(code => results.find(r => r.scale === code))
    .filter((r): r is ScaleResult => r !== undefined);

  const data = {
    labels: sortedResults.map(r => SCALES[r.scale].name),
    datasets: [
      {
        label: '나의 점수',
        data: sortedResults.map(r => r.percentage),
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2,
        pointBackgroundColor: sortedResults.map(r => SCALE_COLORS[r.scale]),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { r: number } }) => {
            return `${context.parsed.r}%`;
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
            size: 12,
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
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
