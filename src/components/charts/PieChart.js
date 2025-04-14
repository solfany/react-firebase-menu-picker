import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.scss';
import { useVoteData } from '../../context/VoteProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { summary, loading } = useVoteData();

  const MENU_COLORS = ['#f4a261', '#2a9d8f', '#e76f51', '#457b9d', '#ffb4a2'];
  const chartDataRaw = Object.entries(summary).map(([menu, value], idx) => ({
    label: menu,
    value,
    color: MENU_COLORS[idx % MENU_COLORS.length]
  }));

  const totalValue = chartDataRaw.reduce((sum, item) => sum + item.value, 0);

  const data = {
    labels: chartDataRaw.map(item => item.label),
    datasets: [
      {
        data: chartDataRaw.map(item => item.value),
        backgroundColor: chartDataRaw.map(item => item.color),
        borderWidth: 0,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#1e2b3c',
        bodyColor: '#8b95a1',
        bodyFont: { size: 14 },
        borderColor: '#e5e8eb',
        borderWidth: 1,
        padding: 8,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percentage = Math.round((value / totalValue) * 100);
            return `${context.label}: ${value}명 (${percentage}%)`;
          }
        }
      }
    },
    layout: {
      padding: 20
    },
    cutout: '50%'
  };

  if (loading || totalValue === 0) {
    return <p className="loading-text">통계 데이터를 불러오는 중입니다...</p>;
  }

  return (
    <div className="pie-chart-container">
      <h3 className="chart-title">최다 득표 메뉴</h3>

      <div className="chart-wrapper">
        <Pie data={data} options={options} />
      </div>

      <div className="legend-container">
        {chartDataRaw.map((item, index) => (
          <div key={index} className="legend-item">
            <span className="color-box" style={{ backgroundColor: item.color }}></span>
            <span className="label">{item.label}</span>
            <span className="value">{item.value}명</span>
            <span className="percentage">
              {Math.round((item.value / totalValue) * 100)}%
            </span>
          </div>
        ))}
      </div>

      <div className="total-info">
        <span className="label">총 인원</span>
        <span className="value">{totalValue}명</span>
      </div>
    </div>
  );
};

export default PieChart;
