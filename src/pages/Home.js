import React, { useState } from "react";
import { useVoteData } from "../context/VoteProvider";

import FlexSection from "../components/section/FlexSection/FlexSection";
import Card from "../components/card/DefaultCard/DefaultCard";
import MenuResult from "./MenuResult";
import VoteTimerNotification from "../components/timer/VoteTimerNotification/VoteTimerNotification";

import UserDiningSelector from "../components/select/UserDiningSelector/UserDiningSelector";
import InternalRestaurantCard from "../components/card/InternalRestaurantCard/InternalRestaurantCard";
import ExternalRestaurantCard from "../components/card/ExternalRestaurantCard/ExternalRestaurantCard";
import NotVotedCard from "../components/card/NotVotedCard/NotVotedCard";

import users from "../data/users.json";
import menuData from "../data/menus.json";
import externalMenuData from "../data/externalMenu.json";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [diningMode, setDiningMode] = useState("internal"); // 'internal' or 'external'
  const isExternalEnabled = true;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR");
  const dayIndex = today.getDay();
  const dayName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ][dayIndex];
  const dayData = menuData[dayName] || {};

  const { userVotes } = useVoteData();

  const votedNames = userVotes
    .filter((v) => Array.isArray(v.selections) && v.selections.length > 0)
    .map((v) => v.name);

  const notVotedUsers = users.filter((user) => !votedNames.includes(user.name));

  return (
    <>
      <VoteTimerNotification />
      <FlexSection>
        {/* 좌측: 유저 선택 및 모드 전환 */}
        <Card className="layout-card">
          <UserDiningSelector
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            diningMode={diningMode}
            setDiningMode={setDiningMode}
            isExternalEnabled={isExternalEnabled}
          />
        </Card>

        {/* 중앙: 오늘의 메뉴 or 외식 메뉴 */}
        <Card className="layout-card">
          {diningMode === "internal" ? (
            <InternalRestaurantCard
              restaurant={dayData.restaurant}
              dayName={dayName}
              formattedDate={formattedDate}
              selectedUser={selectedUser}
              todayMenus={dayData.menus}
              todayCategories={dayData.categories}
            />
          ) : (
            <ExternalRestaurantCard
              dayName={dayName}
              formattedDate={formattedDate}
              selectedUser={selectedUser}
              todayCategories={externalMenuData.categories}
            />
          )}
          <MenuResult />
        </Card>

        {/* 우측: 미투표 인원 */}
        <NotVotedCard notVotedUsers={notVotedUsers} />
      </FlexSection>
    </>
  );
};

export default Home;
