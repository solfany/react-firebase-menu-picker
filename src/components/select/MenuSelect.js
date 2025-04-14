import React, { useEffect, useState } from 'react';
import './MenuSelect.scss';
import DefaultButton from '../button/DefaultButton';
import GoBackButton from '../button/GoBackButton';
import Card from '../card/Card';
import { ref, get, set } from "firebase/database";
import { database } from '../../firebase/firebase';
import users from '../../data/users.json';
import menusData from '../../data/menus.json';

const MenuSelect = ({ user, onComplete }) => {
  const today = new Date();
  const dayName = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][today.getDay()];
  const todayKey = today.toISOString().slice(0, 10).replace(/-/g, '');
  const menus = menusData[dayName]?.menus || [];

  const [votedMenu, setVotedMenu] = useState(null);

  const getUserInfo = (name) => {
    return users.find(user => user.name === name) || {};
  };

  const fetchUserVote = async () => {
    const voteRef = ref(database, `votes/${todayKey}/userVotes/${user}`);
    const snapshot = await get(voteRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setVotedMenu(data.menu);
    }
  };

  useEffect(() => {
    fetchUserVote();
  }, [user]);

  const handleSelect = async (menu) => {
    const userInfo = getUserInfo(user);
    if (!userInfo.name) {
      alert('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    const voteRef = ref(database, `votes/${todayKey}/userVotes/${user}`);
    const existing = await get(voteRef);

    // 이미 투표했는데 같은 메뉴 → 아무것도 안 함
    if (existing.exists() && existing.val().menu === menu) {
      alert(`${user}님은 이미 ${menu}에 투표하셨습니다.`);
      return;
    }

    // 기존 메뉴 summary 감소
    if (existing.exists()) {
      const prevMenu = existing.val().menu;
      const prevSummaryRef = ref(database, `votes/${todayKey}/summary/${prevMenu}`);
      const prevSnap = await get(prevSummaryRef);
      if (prevSnap.exists()) {
        const count = prevSnap.val();
        await set(prevSummaryRef, Math.max(count - 1, 0));
      }
    }

    // 새 메뉴 summary 증가
    const newSummaryRef = ref(database, `votes/${todayKey}/summary/${menu}`);
    const newSnap = await get(newSummaryRef);
    const newCount = newSnap.exists() ? newSnap.val() : 0;
    await set(newSummaryRef, newCount + 1);

    // 사용자 투표 저장
    await set(voteRef, {
      name: userInfo.name,
      department: userInfo.department,
      menu,
      timestamp: Date.now()
    });

    setVotedMenu(menu);
    alert(`${user}님이 ${menu}를 선택하셨습니다!`);
    onComplete();
  };

  return (
    <div className="menu-select-container">
      <div className="header-content">
        <GoBackButton onClick={onComplete}>뒤로가기</GoBackButton>
      </div>
      <Card>
        <h4 className="user-prompt">{user}님, 메뉴를 선택해주세요</h4>
        <div className="menu-buttons">
          {menus.map((menu) => {
            const isSelected = votedMenu === menu;
            return (
              <DefaultButton
                key={menu}
                onClick={() => handleSelect(menu)}
                className={`menu-button ${isSelected ? 'selected' : ''}`}
              >
                {menu}
              </DefaultButton>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default MenuSelect;
