import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./PieChart.module.scss";
import { useVoteData } from "../../../context/VoteProvider";
import LoadingSpinner from "../../loading/LoadingSpinner/LoadingSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { summary, loading } = useVoteData();

  const MENU_COLORS = ["#f4a261", "#2a9d8f", "#e76f51", "#457b9d", "#ffb4a2"];
  const chartDataRaw = Object.entries(summary).map(([menu, value], idx) => ({
    label: menu,
    value,
    color: MENU_COLORS[idx % MENU_COLORS.length],
  }));

  const totalValue = chartDataRaw.reduce((sum, item) => sum + item.value, 0);

  const chartData =
    totalValue === 0
      ? {
          labels: ["데이터 없음"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["#e9ecef"],
              borderWidth: 0,
            },
          ],
        }
      : {
          labels: chartDataRaw.map((item) => item.label),
          datasets: [
            {
              data: chartDataRaw.map((item) => item.value),
              backgroundColor: chartDataRaw.map((item) => item.color),
              borderWidth: 0,
              hoverOffset: 10,
            },
          ],
        };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: totalValue > 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#1e2b3c",
        bodyColor: "#8b95a1",
        bodyFont: { size: 14 },
        borderColor: "#e5e8eb",
        borderWidth: 1,
        padding: 8,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            if (totalValue === 0) return "데이터 없음";
            const value = context.parsed;
            const percentage = Math.round((value / totalValue) * 100);
            return `${context.label}: ${value}명 (${percentage}%)`;
          },
        },
      },
    },
    layout: { padding: 20 },
    cutout: "50%",
  };

  if (loading) return <LoadingSpinner size={32} />;

  return (
    <div className={styles["pie-chart-container"]}>
      <h3 className={styles["chart-title"]}>최다 득표 메뉴</h3>

      <div className={styles["chart-wrapper"]}>
        <Pie data={chartData} options={options} />
      </div>

      {totalValue === 0 && (
        <p className={styles["no-vote-text"]}>현재 투표 데이터가 없습니다.</p>
      )}

      {totalValue > 0 && (
        <div className={styles["legend-container"]}>
          {chartDataRaw.map((item, index) => (
            <div key={index} className={styles["legend-item"]}>
              <span
                className={styles["color-box"]}
                style={{ backgroundColor: item.color }}
              ></span>
              <span className={styles["label"]}>{item.label}</span>
              <span className={styles["value"]}>{item.value}명</span>
              <span className={styles["percentage"]}>
                {Math.round((item.value / totalValue) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}

      <div className={styles["total-info"]}>
        <span className={styles["label"]}>총 인원</span>
        <span className={styles["value"]}>{totalValue}명</span>
      </div>
    </div>
  );
};

export default PieChart;
