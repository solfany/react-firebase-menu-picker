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

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('ko-KR');
  const dayIndex = today.getDay();
  const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][dayIndex];

  const todayMenus = menuData[dayName]?.menus || [];
  const restaurant = menuData[dayName]?.restaurant || '';

  const { userVotes } = useVoteData();

  const votedNames = userVotes.map((vote) => vote.name);
  const notVotedUsers = users.filter((user) => !votedNames.includes(user.name));

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
        <Card className="inner-card">
          <Title>오늘의 식당: {restaurant}</Title>
          <Text>오늘은 {formattedDate}입니다.</Text>
          <Text>요일: {dayName}</Text>
          <Text>메뉴:</Text>
          <ul>
            {todayMenus.map((menu, idx) => (
              <li key={idx}>- {menu}</li>
            ))}
          </ul>
          {selectedUser && <Text>선택한 사용자: {selectedUser}</Text>}
        </Card>

        <MenuStats />
      </Card>
      <Card className="inner-auto-card">
      <Text>투표하지 않은 명단</Text>
          {notVotedUsers.length === 0 ? (
            <Text>모든 인원이 투표를 완료했습니다 🎉</Text>
          ) : (
            <ul className=''>
              {notVotedUsers.map(({ name, department }) => (
                <li key={name}>
                  {department} - {name}
                </li>
              ))}
            </ul>
          )}
        </Card>
    </FlexSection>
  );
};

export default Home;
