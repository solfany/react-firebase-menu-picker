// src/components/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuStats from '../pages/MenuStats';
import FlexSection from '../components/section/FlexSection';
import Card from '../components/card/Card';
import DepartmentVote from '../components/vote/DepartmentVote';
import MenuSelect from '../components/select/MenuSelect';
import Title from '../components/title/Title';
import Text from '../components/text/Text';
import menuData from '../data/menus.json';
import { useVoteData } from '../context/VoteProvider';
import users from '../data/users.json';
import { FiMapPin, FiCalendar, FiUser, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'; // 여기 변경

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('ko-KR');
  const dayIndex = today.getDay()+1;
  const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][dayIndex];

  const todayMenus = menuData[dayName]?.menus || [];
  const restaurant = menuData[dayName]?.restaurant || '';
  const dayData = menuData[dayName] || {};
  const todayCategories = dayData.categories || [];
  const { userVotes } = useVoteData();

  const votedNames = userVotes.map((vote) => vote.name);

  const notVotedUsers = users.filter((user) => !votedNames.includes(user.name));
  const isEmpty = notVotedUsers.length === 0;
  return (
    <FlexSection>
      {/* Left Panel: 사용자 선택 or 메뉴 선택 */}
      <Card className="layout-card">
        {!selectedUser ? (
          <DepartmentVote
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        ) : (
          <MenuSelect user={selectedUser} onComplete={() => setSelectedUser(null)} />
        )}
      </Card>
      {/* Right Panel: 오늘의 메뉴 / 날짜 정보 */}
      <Card className="layout-card">
        <Card className="restaurant-card">
          <div className="restaurant-card__header">
            <Title variant="primary" icon={<FiMapPin size={24} />}>
              오늘의 식당: {restaurant}
            </Title>
          </div>

          <div className="restaurant-card__content">
            <div className="restaurant-card__info">
              <div className="restaurant-card__date-info">
                <FiCalendar size={16} />
                <Text>{formattedDate} ({dayName})</Text>
              </div>

              {selectedUser && (
                <div className="restaurant-card__user-info">
                  <FiUser size={16} />
                  <Text>선택한 사용자: {selectedUser}</Text>
                </div>
              )}
            </div>
            <div className="restaurant-card__menu">
              <h3 className="restaurant-card__menu-title">메뉴판 미리보기</h3>

              {todayCategories.length > 0 ? (
                <div className="restaurant-card__categories">
                  {todayCategories.map((category, catIdx) => (
                    <div key={catIdx} className="restaurant-card__category-block">
                      <h4 className="restaurant-card__category-title">
                        {category.label}
                        <span className="restaurant-card__category-count">
                          {category.items.length}개
                        </span>
                      </h4>
                      <ul className="restaurant-card__menu-list">
                        {category.items.map((menu, idx) => (
                          <li key={idx} className="restaurant-card__menu-item">
                            {menu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="restaurant-card__menu-list">
                  {todayMenus.map((menu, idx) => (
                    <li key={idx} className="restaurant-card__menu-item">
                      {menu}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
        <MenuStats />
      </Card>
      <Card className="not-voted-card">
        <div className="not-voted-card__header">
          <div className="not-voted-card__title">
            <FiAlertCircle size={18} />
            <h3>투표하지 않은 명단</h3>
          </div>
          <span className="not-voted-card__badge">
            {notVotedUsers.length}명
          </span>
        </div>
        <div className="not-voted-card__content">
          {isEmpty ? (
            <div className="not-voted-card__empty">
              <FiCheckCircle size={48} />
              <Text>모든 인원이 투표를 완료했습니다 🎉</Text>
            </div>
          ) : (
            <ul className="not-voted-card__list">
              {notVotedUsers.map(({ name, department }) => (
                <li key={name} className="not-voted-card__list-item">
                  <FiUser size={14} />
                  <span className="not-voted-card__department">{department}</span>
                  <span className="not-voted-card__name">{name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </FlexSection>
  );
};

export default Home;
