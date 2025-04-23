import React, { useEffect, useState } from 'react';
import { FiUser, FiArrowLeft } from 'react-icons/fi';
import DefaultButton from '../../button/DefaultBuutton/DefaultButton';
import GoBackButton from '../../button/GoBackButton/GoBackButton';
import Card from '../../card/DefaultCard/DefaultCard';
import { ref, get, set } from 'firebase/database';
import { database } from '../../../firebase/firebase';
import users from '../../../data/users.json';
import menusData from '../../../data/menus.json';
import useToast from '../../../hooks/useToast';
import styles from './MenuSelect.module.scss';
import { useVoteData } from '../../../context/VoteProvider';

const MenuSelect = ({ user, onComplete }) => {
  const today = new Date();
  const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][today.getDay()];
  const todayKey = today.toISOString().slice(0, 10).replace(/-/g, '');
  // Renamed the destructured variables to avoid conflicts
  const { menus: dayMenus = [], categories: dayCategories = [] } = menusData[dayName] || {};
  const { setWatchTemp } = useVoteData();
  const { showToast } = useToast();

  const [votedMenu, setVotedMenu] = useState(null);

  const getUserInfo = (name) => users.find(u => u.name === name) || {};

  useEffect(() => {
    const fetchUserVote = async () => {
      const snapshot = await get(ref(database, `votes/${todayKey}/userVotes/${user}`));
      if (snapshot.exists()) setVotedMenu(snapshot.val().menu);
    };
    fetchUserVote();
  }, [user, todayKey]);

  const handleSelect = async (menu) => {
    const userInfo = getUserInfo(user);
    if (!userInfo.name) return showToast('사용자 정보를 찾을 수 없습니다.', 3000);

    const voteRef = ref(database, `votes/${todayKey}/userVotes/${user}`);
    const existing = await get(voteRef);

    if (existing.exists()) {
      const prevMenu = existing.val().menu;
      if (prevMenu === menu) {
        return showToast(`${user}님은 이미 '${menu}'에 투표하셨습니다.`, 3000);
      }

      // 이전 summary 감소
      const prevRef = ref(database, `votes/${todayKey}/summary/${prevMenu}`);
      const prevSnap = await get(prevRef);
      if (prevSnap.exists()) {
        await set(prevRef, Math.max(prevSnap.val() - 1, 0));
      }

      showToast(`${user}님이 '${prevMenu}'에서 '${menu}'로 변경하셨습니다!`, 3000);
    } else {
      showToast(`${user}님이 '${menu}'를 선택하셨습니다!`, 3000);
    }

    // summary 증가
    const summaryRef = ref(database, `votes/${todayKey}/summary/${menu}`);
    const summarySnap = await get(summaryRef);
    await set(summaryRef, (summarySnap.exists() ? summarySnap.val() : 0) + 1);

    // 투표 정보 저장
    await set(voteRef, {
      name: userInfo.name,
      department: userInfo.department,
      menu,
      timestamp: Date.now()
    });

    setVotedMenu(menu);
    setWatchTemp(true);
    onComplete();
  };

  return (
    <div className={styles['menu-select-container']}>
      <div className={styles['menu-select__content']}>
        <h4 className={styles['menu-select__prompt']}>
          {user}님, 메뉴를 선택해주세요
        </h4>

        {(dayCategories.length > 0 ? dayCategories : [{ items: dayMenus }]).map(({ label, items }, catIdx) => (
          <div key={label || catIdx} className={styles['menu-category']}>
            {label && <h5 className={styles['menu-category__title']}>{label}</h5>}
            <div className={styles['menu-items']}>
              {items.map((menu, idx) => (
                <button
                  key={`${menu}-${idx}`}
                  onClick={() => handleSelect(menu)}
                  className={`${styles['menu-item']} ${votedMenu === menu ? styles['active'] : ''}`}
                >
                  {menu}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSelect;