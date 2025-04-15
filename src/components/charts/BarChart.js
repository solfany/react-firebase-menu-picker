import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import './BarChart.scss';
import { useVoteData } from '../../context/VoteProvider';
import users from '../../data/users.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BarChart = () => {
  const { userVotes, loading } = useVoteData();
  const totalUsers = users.length;
  const votedCount = userVotes.length;
  const notVotedCount = totalUsers - votedCount;

  // 데이터가 없어도 0으로 표시하여 차트 렌더링
  const data = {
    labels: ['주문 완료', '미주문'],
    datasets: [
      {
        label: '인원 수',
        data: [votedCount, notVotedCount],
        backgroundColor: ['#3182f6', '#ff5a5a'],
        borderRadius: 4,
        borderWidth: 0,
        hoverBackgroundColor: ['#3182f6cc', '#ff5a5acc'],
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        color: '#1e2b3c',
        font: {
          size: 18,
          weight: '500',
        },
        padding: { bottom: 16 },
        align: 'center'
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#1e2b3c',
        bodyColor: '#8b95a1',
        borderColor: '#e5e8eb',
        borderWidth: 1,
        padding: 8,
        cornerRadius: 8
      },
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#8b95a1' }
      },
      y: {
        grid: { color: '#e5e8eb' },
        ticks: { color: '#8b95a1' }
      }
    }
  };

  if (loading) return <p className="loading-text">로딩 중입니다...</p>;

  return (
<div className="bar-chart-container">
  <h3 className="chart-title">주문 현황</h3>
  <div className="chart-wrapper">
    <Bar data={data} options={options} />
  </div>

  {votedCount === 0 && (
    <p className="no-vote-text">현재 투표 데이터가 없습니다.</p>
  )}

  <div className="chart-info">
    <div className="legend-item">
      <span className="color-indicator primary" />
      <span className="label">주문 완료</span>
      <span className="value">{votedCount}명</span>
    </div>
    <div className="legend-item">
      <span className="color-indicator danger" />
      <span className="label">미주문</span>
      <span className="value">{notVotedCount}명</span>
    </div>
    <div className="total-info">
      <span className="label">총 인원</span>
      <span className="value">{totalUsers}명</span>
    </div>
  </div>
</div>

  );
};

export default BarChart;