import React, { useEffect } from "react";
import Card from "../components/card/DefaultCard/DefaultCard";
import Title from "../components/title/DefaultTitle/DefaultTitle";
import styles from "./ResultChart.module.scss";
import FlexSection from "../components/section/FlexSection/FlexSection";
import { useVoteData } from "../context/VoteProvider";
import externalMenu from "../data/externalMenu.json";
import { FiInfo } from "react-icons/fi";

const Result = () => {
  const { userVotes, summary, loading, startWatching, stopWatching } =
    useVoteData();

  useEffect(() => {
    startWatching();

    // 5초 후 리스너 종료 (Spark 요금제 대응)
    const timeout = setTimeout(() => {
      stopWatching();
    }, 5000);

    return () => {
      clearTimeout(timeout); // 컴포넌트 언마운트 시 clear
      stopWatching();
    };
  }, []);

  if (loading) {
    return (
      <FlexSection>
        <Card className={styles.loadingCard}>
          <div className={styles.loadingIcon}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>데이터를 불러오는 중입니다...</p>
          </div>
        </Card>
      </FlexSection>
    );
  }

  const hasVotes = userVotes.length > 0;
  const validMenus = Object.entries(summary).filter(([_, count]) => count > 0);
  const hasSummary = validMenus.length > 0;
  const totalVotes = Object.values(summary).reduce((a, b) => a + b, 0);

  const externalMenuSet = new Set(externalMenu.categories.map((c) => c.label));

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

  const topMenuEntry = validMenus.sort((a, b) => b[1] - a[1])[0];
  const topMenu = topMenuEntry
    ? {
        name: topMenuEntry[0],
        count: topMenuEntry[1],
        type: externalMenuSet.has(topMenuEntry[0]) ? "외식" : "사내",
      }
    : { name: "-", count: 0, type: "-" };

  const memoMap = {};
  userVotes.forEach(({ name, department, selections }) => {
    if (Array.isArray(selections)) {
      selections.forEach(({ menu, memo }) => {
        if (!memoMap[menu]) memoMap[menu] = [];
        if (memo) memoMap[menu].push({ name, department, memo });
      });
    }
  });

  return (
    <FlexSection className={styles.resultContainer}>
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
                  <th>메모</th>
                  <th>메뉴 타입</th>
                </tr>
              </thead>
              <tbody>
                {userVotes
                  .filter(
                    ({ selections }) =>
                      Array.isArray(selections) && selections.length > 0
                  )
                  .flatMap(({ department, name, selections }) =>
                    selections.map(({ menu, memo }, idx) => {
                      const isExternal = externalMenuSet.has(menu);
                      const type = isExternal ? "외식" : "사내";
                      const tagClass = `${styles.menuTag} ${
                        isExternal ? styles.external : styles.internal
                      }`;

                      return (
                        <tr key={`${department}-${name}-${idx}`}>
                          <td>{department}</td>
                          <td>{name}</td>
                          <td>
                            <span className={tagClass}>{menu}</span>
                          </td>
                          <td>{memo || "-"}</td>
                          <td>
                            <span className={tagClass}>({type})</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
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

      <Card className={styles.statsRight}>
        <header className={styles.cardHeader}>
          <Title className={styles.cardTitle}>현재 투표 통계</Title>
          {hasSummary && (
            <div className={styles.voteCount}>
              <span>총 {totalVotes}표</span>
            </div>
          )}
        </header>

        {hasSummary ? (
          <div className={styles.menuChart}>
            {validMenus
              .sort(([, a], [, b]) => b - a)
              .map(([menu, count]) => {
                const percent = ((count / totalVotes) * 100).toFixed(1);
                const memos = memoMap[menu] || [];

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
                    {memos.length > 0 && (
                      <div className={styles.memoList}>
                        <ul>
                          {memos.map(({ name, department, memo }, i) => (
                            <li
                              key={`${menu}-memo-${i}`}
                              className={styles.memoItem}
                            >
                              <span className={styles.memoName}>{name}</span>{" "}
                              <span className={styles.memoDept}>
                                {department}
                              </span>{" "}
                              <span className={styles.memoRequest}>{memo}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={styles.noDataContainer}>
            <div className={styles.noDataIcon}>
              <FiInfo size={48} />
            </div>
            <p className={styles.noDataText}>아직 투표 데이터가 없습니다.</p>
          </div>
        )}
      </Card>
    </FlexSection>
  );
};

export default Result;
