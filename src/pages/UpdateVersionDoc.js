import { useState } from "react";
import styles from "./UpdateVersionDoc.module.scss";
import versionDataJson from "../data/versionData.json";

const UpdateVersionDoc = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set([0]));

  const versionHistory = versionDataJson.versionHistory ?? [];

  const sortedVersions = versionHistory.slice().sort((a, b) => {
    switch (sortOrder) {
      case "latest":
        return b.date.localeCompare(a.date);
      case "oldest":
        return a.date.localeCompare(b.date);
      case "version":
        return b.version.localeCompare(a.version);
      default:
        return 0;
    }
  });

  const filteredVersions = sortedVersions.filter((item) =>
    item.updates.some((update) =>
      update.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  const toggleExpand = (index) => {
    const updated = new Set(expandedItems);
    updated.has(index) ? updated.delete(index) : updated.add(index);
    setExpandedItems(updated);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredVersions.map((_, idx) => idx)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className={styles.versionDocContainer}>
      <h1 className={styles.pageTitle}>버전 업데이트 내역</h1>

      <div className={styles.controlPanel}>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="version">버전순</option>
        </select>

        <input
          type="text"
          placeholder="업데이트 내용 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <div className={styles.expandControls}>
          <button onClick={expandAll} className={styles.expandBtn}>모두 펼치기</button>
          <button onClick={collapseAll} className={styles.expandBtn}>모두 접기</button>
        </div>
      </div>

      <div>
        {filteredVersions.length > 0 ? (
          filteredVersions.map((item, index) => {
            const isExpanded = expandedItems.has(index);
            const isLatest = index === 0 && sortOrder === "latest";

            return (
              <div
                key={`${item.version}-${item.date}`}
                className={`${styles.versionCard} ${isLatest ? styles.latestCard : ""}`}
              >
                <div
                  className={`${styles.versionHeader} ${styles.clickable}`}
                  onClick={() => toggleExpand(index)}
                >
                  <div className={styles.versionTitleGroup}>
                    <h2 className={styles.versionTitle}>{item.version}</h2>
                    {isLatest && <span className={styles.newBadge}>NEW</span>}
                    <span className={styles.updateCount}>({item.updates.length}개 업데이트)</span>
                  </div>
                  <div className={styles.headerRight}>
                    <span className={styles.versionDate}>{item.date}</span>
                    <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ""}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className={styles.updateContent}>
                    <ul className={styles.updateList}>
                      {item.updates.map((update, idx) => (
                        <li key={idx} className={styles.updateItem}>
                          {update}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className={styles.noData}>일치하는 업데이트가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default UpdateVersionDoc;
