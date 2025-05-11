import React from "react";
import Card from "../components/card/DefaultCard/DefaultCard";
import Title from "../components/title/DefaultTitle/DefaultTitle";
import styles from "./ResultChart.module.scss";
import FlexSection from "../components/section/FlexSection/FlexSection";
import { useVoteData } from "../context/VoteProvider";
import externalMenu from "../data/externalMenu.json";
import { FiInfo } from "react-icons/fi";
import { Section } from "lucide";

const Result = () => {
  const { userVotes, summary, loading } = useVoteData();

  if (loading)
    return (
      <FlexSection>
        <Card className={styles.loadingCard}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>데이터를 불러오는 중입니다...</p>
        </Card>
      </FlexSection>
    );

  // 투표 데이터 존재 여부 확인
  const hasVotes = userVotes.length > 0;

  // 0표인 항목을 제외한 유효한 메뉴 데이터만 필터링
  const validMenus = Object.entries(summary).filter(([_, count]) => count > 0);
  const hasSummary = validMenus.length > 0;

  // 총 투표수 계산
  const totalVotes = Object.values(summary).reduce((a, b) => a + b, 0);

  // 외식 데이터 받아오기
  const externalMenuSet = new Set(externalMenu.categories.map((c) => c.label));

  // 외식/사내 득표 구분
  let externalVotes = 0;
  let internalVotes = 0;
  Object.entries(summary).forEach(([menu, count]) => {
    if (count > 0) {
      if (externalMenuSet.has(menu)) {
        externalVotes += count;
      } else {
        internalVotes += count;
      }
    }
  });

  // 최다 득표 메뉴 추출
  const topMenuEntry = validMenus.sort((a, b) => b[1] - a[1])[0];
  const topMenu = topMenuEntry
    ? {
        name: topMenuEntry[0],
        count: topMenuEntry[1],
        type: externalMenuSet.has(topMenuEntry[0]) ? "외식" : "사내",
      }
    : { name: "-", count: 0, type: "-" };
  return (
    <>
      <FlexSection className={styles.resultContainer}>
        {/* 왼쪽: 부서별 투표 현황 */}
        <Card className={styles.statsLeft}>
          <header className={styles.cardHeader}>
            <Title className={styles.cardTitle}>부서별 투표 결과</Title>
            {hasVotes && (
              <div className={styles.voteCount}>
                <span>총 {userVotes.length}명 투표</span>
              </div>
            )}
          </header>

          {hasVotes ? (
            <div className={styles.tableContainer}>
              <table className={styles.statsTable}>
                <thead>
                  <tr>
                    <th>부서</th>
                    <th>이름</th>
                    <th>선택한 메뉴</th>
                    <th>메뉴 타입</th>
                  </tr>
                </thead>
                <tbody>
                  {userVotes.map(({ department, name, menu }) => {
                    const isExternal = externalMenuSet.has(menu);
                    const type = isExternal ? "외식" : "사내";

                    // 공통 클래스 + 조건별 스타일 클래스 결합
                    const tagClass = `${styles.menuTag} ${
                      isExternal ? styles.external : styles.internal
                    }`;

                    return (
                      <tr key={`${department}-${name}`}>
                        <td>{department}</td>
                        <td>{name}</td>
                        <td>
                          <span className={tagClass}>{menu}</span>
                        </td>
                        <td>
                          <span className={tagClass}>({type})</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.noDataContainer}>
              <div className={styles.noDataIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <p className={styles.noDataText}>아직 투표 데이터가 없습니다.</p>
            </div>
          )}
        </Card>

        {/* 오른쪽: 메뉴별 집계 막대그래프 */}
        <Card className={styles.statsRight}>
          <header className={styles.cardHeader}>
            <Title className={styles.cardTitle}>현재 투표 현황</Title>
            {hasSummary && (
              <div className={styles.voteCount}>
                <span>총 {totalVotes}표</span>
              </div>
            )}
          </header>

          {hasSummary ? (
            <div className={styles.menuChart}>
              {validMenus
                .sort(([_, countA], [__, countB]) => countB - countA) // 투표수 내림차순 정렬
                .map(([menu, count]) => {
                  const percent = ((count / totalVotes) * 100).toFixed(1);
                  return (
                    <div key={menu} className={styles.menuRow}>
                      <div className={styles.menuLabelContainer}>
                        <span className={styles.menuName}>{menu}</span>
                        <div className={styles.voteInfo}>
                          <span className={styles.votePercent}>{percent}%</span>
                          <span className={styles.voteCount}>{count}표</span>
                        </div>
                      </div>
                      <div className={styles.bar}>
                        <div
                          className={styles.fill}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className={styles.noDataContainer}>
              <div className={styles.noDataIcon}>
                <FiInfo size={48} />
                {/* 또는: <AiOutlineInfoCircle size={48} /> */}
              </div>
              <p className={styles.noDataText}>아직 투표 데이터가 없습니다.</p>
            </div>
          )}
        </Card>
      </FlexSection>
    </>
  );
};

export default Result;
