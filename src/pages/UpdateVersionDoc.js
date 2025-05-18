import { useState } from "react";
import Card from "../components/card/DefaultCard/DefaultCard";
import styles from "./UpdateVersionDoc.module.scss";
import FlexSection from "../components/section/FlexSection/FlexSection";
import versionDataJson from "../data/versionData.json";

const UpdateVersionDoc = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");

  const versionHistory = versionDataJson.versionHistory;

  const sortedVersions = versionHistory.slice().sort((a, b) => {
    if (sortOrder === "latest") return b.date.localeCompare(a.date);
    if (sortOrder === "oldest") return a.date.localeCompare(b.date);
    if (sortOrder === "version") return b.version.localeCompare(a.version);
    return 0;
  });

  const filteredVersions = sortedVersions.filter((item) =>
    item.updates.some((update) =>
      update.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div className={styles.versionDocContainer}>
      <h1 className={styles.pageTitle}>버전 업데이트 내역</h1>

      <div className={styles.controlPanel}>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
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
      </div>

      <FlexSection className={styles.resultContainer}>
        {filteredVersions.length > 0 ? (
          filteredVersions.map((item, index) => (
            <Card
              key={index}
              className={`${styles.versionCard} ${
                index === 0 && sortOrder === "latest" ? styles.latestCard : ""
              }`}
            >
              <div className={styles.versionHeader}>
                <div className={styles.versionTitleGroup}>
                  <h2 className={styles.versionTitle}>{item.version}</h2>
                  {index === 0 && sortOrder === "latest" && (
                    <span className={styles.newBadge}>NEW</span>
                  )}
                </div>
                <span className={styles.versionDate}>{item.date}</span>
              </div>

              <ul className={styles.updateList}>
                {item.updates.map((update, idx) => (
                  <li key={idx} className={styles.updateItem}>
                    {update}
                  </li>
                ))}
              </ul>
            </Card>
          ))
        ) : (
          <div className={styles.noData}>일치하는 업데이트가 없습니다.</div>
        )}
      </FlexSection>
    </div>
  );
};

export default UpdateVersionDoc;
