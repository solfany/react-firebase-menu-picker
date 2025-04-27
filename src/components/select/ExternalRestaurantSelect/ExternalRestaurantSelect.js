import React, { useEffect, useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { database } from '../../../firebase/firebase';
import users from '../../../data/users.json';
import externalMenuData from '../../../data/externalMenu.json';
import Text from '../../text/DefaultText/DefaultText';
import styles from './ExternalRestaurantSelect.module.scss';
import { useVoteData } from '../../../context/VoteProvider';
import useToast from '../../../hooks/useToast';

const ExternalRestaurantSelect = ({ user, onComplete }) => {
  const { setWatchTemp } = useVoteData();
  const { showToast } = useToast();

  const today = new Date();
  const dayIndex = today.getDay()+1;
  const isWeekend = dayIndex === 0 || dayIndex === 6;
  const todayKey = today.toISOString().slice(0, 10).replace(/-/g, '');
  const todayCategories = externalMenuData.categories || [];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const getUserInfo = (name) => users.find(u => u.name === name) || {};

  // 🔥 처음 진입 시 이미 투표한 값 불러오기
  useEffect(() => {
    const fetchUserVote = async () => {
      const voteRef = ref(database, `votes/${todayKey}/userVotes/${user}`);
      const snapshot = await get(voteRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setSelectedCategory(data.menu); // 🔥 이미 투표한 카테고리로 표시
      }
    };

    fetchUserVote();
  }, [user, todayKey]);

  const handleSelect = async (categoryLabel) => {
    const userInfo = getUserInfo(user);
    if (!userInfo.name) return showToast('사용자 정보를 찾을 수 없습니다.', 3000);

    const voteRef = ref(database, `votes/${todayKey}/userVotes/${user}`);
    const existing = await get(voteRef);

    if (existing.exists()) {
      const prevMenu = existing.val().menu;
      if (prevMenu === categoryLabel) {
        return showToast(`${user}님은 이미 '${categoryLabel}'에 투표하셨습니다.`, 3000);
      }

      const prevRef = ref(database, `votes/${todayKey}/summary/${prevMenu}`);
      const prevSnap = await get(prevRef);
      if (prevSnap.exists()) {
        await set(prevRef, Math.max(prevSnap.val() - 1, 0));
      }

      showToast(`${user}님이 '${prevMenu}'에서 '${categoryLabel}'로 변경하셨습니다!`, 3000);
    } else {
      showToast(`${user}님이 '${categoryLabel}'를 선택하셨습니다!`, 3000);
    }

    const summaryRef = ref(database, `votes/${todayKey}/summary/${categoryLabel}`);
    const summarySnap = await get(summaryRef);
    await set(summaryRef, (summarySnap.exists() ? summarySnap.val() : 0) + 1);

    await set(voteRef, {
      name: userInfo.name,
      department: userInfo.department,
      menu: categoryLabel,
      timestamp: Date.now()
    });

    setSelectedCategory(categoryLabel); // ✅ 바로 선택한 메뉴로 업데이트
    setWatchTemp(true);

    setTimeout(() => onComplete(), 2000);
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.prompt}>
        {user}님, {isWeekend ? '오늘은 주말입니다.' : '요리 카테고리를 선택해주세요'}
      </h3>

      {isWeekend ? (
        <p className={styles.weekendNotice}>
          주말에는 외식 투표를 진행하지 않습니다.
        </p>
      ) : (
        <div className={styles.buttons}>
          {todayCategories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(category.label)}
              className={`${styles.button} ${selectedCategory === category.label ? styles.active : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExternalRestaurantSelect;
