import React, { useEffect, useState } from "react";
import { ref, get, set } from "firebase/database";
import { database } from "../../../firebase/firebase";
import users from "../../../data/users.json";
import menusData from "../../../data/menus.json";
import useToast from "../../../hooks/useToast";
import { useVoteData } from "../../../context/VoteProvider";
import styles from "./MenuSelect.module.scss";

const MenuSelect = ({ user }) => {
  const today = new Date();
  const dayIndex = today.getDay();
  const dayNameKor = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ][dayIndex];
  const todayKey = today.toISOString().slice(0, 10).replace(/-/g, "");

  const { menus: dayMenus = [], categories: dayCategories = [] } =
    menusData[dayNameKor] || {};
  const { showToast } = useToast();
  const { startWatching, stopWatching } = useVoteData();

  const [selections, setSelections] = useState([]);
  const [editingMemoIndex, setEditingMemoIndex] = useState(null);
  const [tempMemo, setTempMemo] = useState("");

  const getUserInfo = (name) => users.find((u) => u.name === name) || {};

  useEffect(() => {
    const fetchUserVotes = async () => {
      const snapshot = await get(
        ref(database, `votes/${todayKey}/userVotes/${user}`)
      );
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.selections) {
          setSelections(userData.selections);
        }
      }
    };
    fetchUserVotes();
  }, [user, todayKey]);

  const startShortPolling = () => {
    startWatching();
    setTimeout(() => stopWatching(), 5000);
  };

  const handleSelect = async (menu) => {
    const userInfo = getUserInfo(user);
    if (!userInfo.name)
      return showToast("사용자 정보를 찾을 수 없습니다.", 3000);

    const newSelections = [...selections, { menu, memo: "" }];
    setSelections(newSelections);
    showToast(`${user}님이 '${menu}'를 선택하셨습니다!`, 3000);

    const summaryRef = ref(database, `votes/${todayKey}/summary/${menu}`);
    const summarySnap = await get(summaryRef);
    await set(summaryRef, (summarySnap.exists() ? summarySnap.val() : 0) + 1);

    await set(ref(database, `votes/${todayKey}/userVotes/${user}`), {
      name: userInfo.name,
      department: userInfo.department,
      selections: newSelections,
      timestamp: Date.now(),
    });

    startShortPolling();
  };

  const handleCancel = async (index) => {
    const target = selections[index];
    if (!target) return;

    const updated = [...selections];
    updated.splice(index, 1);
    setSelections(updated);

    if (editingMemoIndex === index) {
      setEditingMemoIndex(null);
      setTempMemo("");
    }

    const summaryRef = ref(
      database,
      `votes/${todayKey}/summary/${target.menu}`
    );
    const summarySnap = await get(summaryRef);
    if (summarySnap.exists() && summarySnap.val() > 0) {
      await set(summaryRef, summarySnap.val() - 1);
    }

    const userInfo = getUserInfo(user);
    await set(ref(database, `votes/${todayKey}/userVotes/${user}`), {
      name: userInfo.name,
      department: userInfo.department,
      selections: updated,
      timestamp: Date.now(),
    });

    showToast(
      `${user}님이 '${target.menu}'에 대한 투표를 취소하셨습니다!`,
      3000
    );

    startShortPolling();
  };

  const handleMemoClick = (index) => {
    setEditingMemoIndex(index);
    setTempMemo(selections[index].memo);
  };

  const handleMemoSave = async () => {
    if (editingMemoIndex === null) return;

    const updated = [...selections];
    updated[editingMemoIndex].memo = tempMemo;
    setSelections(updated);

    const snapshot = await get(
      ref(database, `votes/${todayKey}/userVotes/${user}`)
    );
    if (snapshot.exists()) {
      const userData = snapshot.val();
      await set(ref(database, `votes/${todayKey}/userVotes/${user}`), {
        ...userData,
        selections: updated,
        timestamp: Date.now(),
      });
    }

    setEditingMemoIndex(null);
    setTempMemo("");
    showToast("메모가 저장되었습니다!", 2000);

    startShortPolling();
  };

  const getVoteCount = (menu) =>
    selections.filter((s) => s.menu === menu).length;

  const isWeekend = dayIndex === 0 || dayIndex === 6;

  return (
    <div className={styles.panel}>
      <h3 className={styles.prompt}>
        {user}님, {isWeekend ? "오늘은 주말입니다." : "메뉴를 선택해주세요"}
      </h3>

      {/* 나의 투표 목록 */}
      <div className={styles.votedMenusContainer}>
        <p className={styles.votedMenusLabel}>나의 투표 목록</p>
        <p className={styles.votedMenusDescription}>
          동일한 메뉴를 여러 번 선택하고, 각 항목마다 메모를 남길 수 있습니다.
          <br />
          <strong>×</strong> 버튼을 누르면 해당 항목을 개별 취소할 수 있습니다.
        </p>

        <div className={styles.votedMenusList}>
          {selections.length > 0 ? (
            selections.map((item, idx) => (
              <div key={`selection-${idx}`} className={styles.votedMenuItem}>
                <span className={styles.votedMenuTag}>{item.menu}</span>

                {editingMemoIndex === idx ? (
                  <>
                    <input
                      className={styles.memoInput}
                      type="text"
                      value={tempMemo}
                      onChange={(e) => setTempMemo(e.target.value)}
                      placeholder="메모를 입력하세요 (예: 맵게)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleMemoSave();
                        }
                      }}
                    />
                    <button
                      className={styles.confirmButton}
                      onClick={handleMemoSave}
                    >
                      확인
                    </button>
                    <button
                      className={styles.cancelEditButton}
                      onClick={() => {
                        setEditingMemoIndex(null);
                        setTempMemo("");
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.memoButton}
                    onClick={() => handleMemoClick(idx)}
                  >
                    {item.memo ? `메모: ${item.memo}` : "메모 작성"}
                  </button>
                )}

                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancel(idx)}
                  title="투표 취소"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className={styles.noVoteMessage}>아직 투표한 항목이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 메뉴 선택 섹션 */}
      {!isWeekend &&
        (dayCategories.length > 0 ? dayCategories : [{ items: dayMenus }]).map(
          ({ label, items }, catIdx) => (
            <div key={label || catIdx} className={styles.category}>
              {label && <h4 className={styles.categoryTitle}>{label}</h4>}
              <div className={styles.buttons}>
                {items.map((menu, idx) => (
                  <button
                    key={`${menu}-${idx}`}
                    onClick={() => handleSelect(menu)}
                    className={`${styles.button} ${
                      selections.some((s) => s.menu === menu)
                        ? styles.active
                        : ""
                    }`}
                  >
                    {menu}
                    {getVoteCount(menu) >= 1 && (
                      <span className={styles.voteCount}>
                        {getVoteCount(menu)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default MenuSelect;
