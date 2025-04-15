import React, { useEffect, useState } from 'react';
import './MenuSelect.scss';
import DefaultButton from '../button/DefaultButton';
import GoBackButton from '../button/GoBackButton';
import Card from '../card/Card';
import { ref, get, set } from 'firebase/database';
import { database } from '../../firebase/firebase';
import users from '../../data/users.json';
import menusData from '../../data/menus.json';
import Toast from '../toast/Toast';

const MenuSelect = ({ user, onComplete }) => {
  const today = new Date();
  const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][today.getDay()];
  const todayKey = today.toISOString().slice(0, 10).replace(/-/g, '');
  const { menus = [], categories = [] } = menusData[dayName] || {};

  const [votedMenu, setVotedMenu] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const getUserInfo = (name) => users.find(u => u.name === name) || {};

  useEffect(() => {
    const fetchUserVote = async () => {
      const snapshot = await get(ref(database, `votes/${todayKey}/userVotes/${user}`));
      if (snapshot.exists()) setVotedMenu(snapshot.val().menu);
    };
    fetchUserVote();
  }, [user]);

// 토스트 보여주기
const showToast = (message) => {
  setToast({ visible: false, message: '' }); // 중복 메시지 방지용 초기화
  setTimeout(() => {
    setToast({ visible: true, message });
  }, 10);
};
const hideToast = () => setToast({ visible: false, message: '' });


  const handleSelect = async (menu) => {
    const userInfo = getUserInfo(user);
    if (!userInfo.name) {
      return showToast('사용자 정보를 찾을 수 없습니다.');
    }

    const voteRef = ref(database, `votes/${todayKey}/userVotes/${user}`);
    const existing = await get(voteRef);

    if (existing.exists() && existing.val().menu === menu) {
      return showToast(`${user}님은 이미 ${menu}에 투표하셨습니다.`);
    }

    // 이전 summary 감소
    if (existing.exists()) {
      const prevMenu = existing.val().menu;
      const prevRef = ref(database, `votes/${todayKey}/summary/${prevMenu}`);
      const prevSnap = await get(prevRef);
      if (prevSnap.exists()) {
        await set(prevRef, Math.max(prevSnap.val() - 1, 0));
      }
    }

    // 새 summary 증가
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
    showToast(`${user}님이 ${menu}를 선택하셨습니다!`);
    onComplete();
  };

  return (
    <div className="menu-select-container">
      <div className="header-content">
        <GoBackButton onClick={onComplete}>뒤로가기</GoBackButton>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast({ visible: false, message: '' })}
      />

      <Card>
        <h4 className="user-prompt">{user}님, 메뉴를 선택해주세요</h4>

        {categories.length > 0 ? (
          categories.map(({ label, items }) => (
            <div key={label} className="menu-category">
              <h5 className="menu-category__title">{label}</h5>
              <div className="menu-buttons">
                {items.map((menu, idx) => (
                  <DefaultButton
                    key={`${menu}-${idx}`}
                    onClick={() => handleSelect(menu)}
                    className={`menu-button ${votedMenu === menu ? 'selected' : ''}`}
                  >
                    {menu}
                  </DefaultButton>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="menu-buttons">
            {menus.map((menu, idx) => (
              <DefaultButton
                key={`${menu}-${idx}`}
                onClick={() => handleSelect(menu)}
                className={`menu-button ${votedMenu === menu ? 'selected' : ''}`}
              >
                {menu}
              </DefaultButton>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MenuSelect;
