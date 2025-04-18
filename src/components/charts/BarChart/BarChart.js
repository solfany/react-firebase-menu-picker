import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './BarChart.module.scss';
import users from '../../../data/users.json';
import { useVoteData } from '../../../context/VoteProvider';
import LoadingSpinner from '../../loading/LoadingSpinner/LoadingSpinner';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BarChart = () => {
  const { userVotes, loading } = useVoteData();
  const totalUsers = users.length;
  const votedCount = userVotes.length;
  const notVotedCount = totalUsers - votedCount;

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

  if (loading) return <LoadingSpinner size={32} />;

  return (
    <div className={styles['bar-chart-container']}>
      <h3 className={styles['chart-title']}>주문 현황</h3>

      <div className={styles['chart-wrapper']}>
        <Bar data={data} options={options} />
      </div>

      {votedCount === 0 && (
        <p className={styles['no-vote-text']}>현재 투표 데이터가 없습니다.</p>
      )}

      <div className={styles['chart-info']}>
        <div className={styles['legend-item']}>
          <span className={`${styles['color-indicator']} ${styles['primary']}`} />
          <span className={styles['label']}>주문 완료</span>
          <span className={styles['value']}>{votedCount}명</span>
        </div>

        <div className={styles['legend-item']}>
          <span className={`${styles['color-indicator']} ${styles['danger']}`} />
          <span className={styles['label']}>미주문</span>
          <span className={styles['value']}>{notVotedCount}명</span>
        </div>

        <div className={styles['total-info']}>
          <span className={styles['label']}>총 인원</span>
          <span className={styles['value']}>{totalUsers}명</span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
