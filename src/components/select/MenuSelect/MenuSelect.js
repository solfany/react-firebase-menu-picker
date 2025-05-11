import React, { useEffect, useState } from "react";
import { ref, get, set } from "firebase/database";
import { database } from "../../../firebase/firebase";
import users from "../../../data/users.json";
import menusData from "../../../data/menus.json";
import useToast from "../../../hooks/useToast";
import { useVoteData } from "../../../context/VoteProvider";
import styles from "./MenuSelect.module.scss";

const MenuSelect = ({ user, onComplete }) => {
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
  const { setWatchTemp } = useVoteData();
  const { showToast } = useToast();

  const [votedMenu, setVotedMenu] = useState(null);

  const getUserInfo = (name) => users.find((u) => u.name === name) || {};

  useEffect(() => {
    const fetchUserVote = async () => {
      const snapshot = await get(
        ref(database, `votes/${todayKey}/userVotes/${user}`)
      );
      if (snapshot.exists()) setVotedMenu(snapshot.val().menu);
    };
    fetchUserVote();
  }, [user, todayKey]);

  const handleSelect = async (menu) => {
    const userInfo = getUserInfo(user);
    if (!userInfo.name)
      return showToast("사용자 정보를 찾을 수 없습니다.", 3000);

    const voteRef = ref(database, `votes/${todayKey}/userVotes/${user}`);
    const existing = await get(voteRef);

    if (existing.exists()) {
      const prevMenu = existing.val().menu;
      if (prevMenu === menu) {
        return showToast(`${user}님은 이미 '${menu}'에 투표하셨습니다.`, 3000);
      }

      const prevRef = ref(database, `votes/${todayKey}/summary/${prevMenu}`);
      const prevSnap = await get(prevRef);
      if (prevSnap.exists()) {
        await set(prevRef, Math.max(prevSnap.val() - 1, 0));
      }

      showToast(
        `${user}님이 '${prevMenu}'에서 '${menu}'로 변경하셨습니다!`,
        3000
      );
    } else {
      showToast(`${user}님이 '${menu}'를 선택하셨습니다!`, 3000);
    }

    const summaryRef = ref(database, `votes/${todayKey}/summary/${menu}`);
    const summarySnap = await get(summaryRef);
    await set(summaryRef, (summarySnap.exists() ? summarySnap.val() : 0) + 1);

    await set(voteRef, {
      name: userInfo.name,
      department: userInfo.department,
      menu,
      timestamp: Date.now(),
    });

    setVotedMenu(menu);
    setWatchTemp(true);
    onComplete();
  };

  const isWeekend = dayIndex === 0 || dayIndex === 6;

  return (
    <div className={styles.panel}>
      <h3 className={styles.prompt}>
        {user}님, {isWeekend ? "오늘은 주말입니다." : "메뉴를 선택해주세요"}
      </h3>

      {isWeekend ? (
        <p className={styles.weekendNotice}>
          주말에는 메뉴 투표를 진행하지 않습니다.
        </p>
      ) : (
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
                      votedMenu === menu ? styles.active : ""
                    }`}
                  >
                    {menu}
                  </button>
                ))}
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default MenuSelect;
