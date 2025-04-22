import React, { useState } from 'react';
import { FiMapPin, FiDollarSign, FiClock, FiTag, FiUser, FiThumbsUp, FiCheck } from 'react-icons/fi';
import FlexSection from '../../components/section/FlexSection/FlexSection';
import Card from '../../components/card/DefaultCard/DefaultCard';
import Title from '../../components/title/DefaultTitle/DefaultTitle';
import Text from '../../components/text/DefaultText/DefaultText';
import { useVoteData } from '../../context/VoteProvider';
import '../../styles/pages/_diningOut.scss';

// Sample data - would come from your context/provider in real implementation
const externalRestaurants = [
  {
    id: 1,
    name: '김밥천국',
    distance: '도보 5분',
    cuisine: '분식',
    priceRange: '₩',
    popularItems: ['김밥', '라면', '비빔밥'],
    votes: 3
  },
  {
    id: 2,
    name: '백반집',
    distance: '도보 7분',
    cuisine: '한식',
    priceRange: '₩₩',
    popularItems: ['제육볶음', '된장찌개', '김치찌개'],
    votes: 5
  },
  {
    id: 3,
    name: '맥도날드',
    distance: '도보 10분',
    cuisine: '패스트푸드',
    priceRange: '₩',
    popularItems: ['빅맥', '상하이버거', '프렌치프라이'],
    votes: 2
  },
  {
    id: 4,
    name: '스시킹',
    distance: '차로 5분',
    cuisine: '일식',
    priceRange: '₩₩₩',
    popularItems: ['사시미', '우동', '스시세트'],
    votes: 1
  }
];

const DiningOut = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [restaurants, setRestaurants] = useState(externalRestaurants);
  
  // In a real implementation, you would use your VoteData context
  // const { addVote, userVotes } = useVoteData();
  
  const handleRestaurantVote = (restaurantId) => {
    if (!selectedUser) return;
    
    setUserVote(restaurantId);
    
    // Update vote count in restaurants
    setRestaurants(
      restaurants.map(restaurant => 
        restaurant.id === restaurantId 
          ? { ...restaurant, votes: restaurant.votes + 1 }
          : restaurant
      )
    );
    
    // In a real implementation, add to your vote context:
    // addVote({
    //   name: selectedUser,
    //   choice: restaurants.find(r => r.id === restaurantId).name,
    //   isExternal: true,
    //   timestamp: new Date().toISOString()
    // });
    
    // Reset selected user after successful vote
    setTimeout(() => {
      setSelectedUser(null);
      setUserVote(null);
    }, 2000);
  };
  
  // Sort restaurants by vote count (highest first)
  const sortedRestaurants = [...restaurants].sort((a, b) => b.votes - a.votes);
  
  return (
    <FlexSection className="dining-out">
      <Card className="dining-out__main-card">
        <div className="dining-out__header">
          <Title variant="primary">
            <FiMapPin size={24} style={{ marginRight: '8px' }} />
            외식 투표
          </Title>
          {selectedUser ? (
            <div className="dining-out__user-selection">
              <FiUser size={16} />
              <span>{selectedUser}</span>
              <button 
                className="dining-out__user-clear" 
                onClick={() => setSelectedUser(null)}
              >
                변경
              </button>
            </div>
          ) : (
            <div className="dining-out__user-prompt">
              <FiUser size={16} />
              <span>투표할 사원을 선택하세요</span>
            </div>
          )}
        </div>
        
        <div className="dining-out__content">
          {!selectedUser ? (
            <div className="dining-out__user-selection-panel">
              <UserSelectionPanel onSelectUser={setSelectedUser} />
            </div>
          ) : (
            <>
              {userVote ? (
                <div className="dining-out__vote-success">
                  <div className="dining-out__vote-success-icon">
                    <FiCheck size={32} />
                  </div>
                  <Text className="dining-out__vote-success-text">
                    투표가 완료되었습니다!
                  </Text>
                  <Text className="dining-out__vote-success-subtext">
                    {restaurants.find(r => r.id === userVote)?.name}에 투표하셨습니다.
                  </Text>
                </div>
              ) : (
                <>
                  <Text className="dining-out__instruction">
                    가고 싶은 외식 장소를 선택해주세요:
                  </Text>
                  
                  <div className="dining-out__restaurant-grid">
                    {sortedRestaurants.map(restaurant => (
                      <div 
                        key={restaurant.id} 
                        className="dining-out__restaurant-card"
                        onClick={() => handleRestaurantVote(restaurant.id)}
                      >
                        <div className="dining-out__restaurant-header">
                          <h3 className="dining-out__restaurant-name">
                            {restaurant.name}
                          </h3>
                          <div className="dining-out__vote-badge">
                            <FiThumbsUp size={14} />
                            <span>{restaurant.votes}</span>
                          </div>
                        </div>
                        
                        <div className="dining-out__restaurant-info">
                          <div className="dining-out__info-item">
                            <FiMapPin size={14} />
                            <span>{restaurant.distance}</span>
                          </div>
                          <div className="dining-out__info-item">
                            <FiTag size={14} />
                            <span>{restaurant.cuisine}</span>
                          </div>
                          <div className="dining-out__info-item">
                            <FiDollarSign size={14} />
                            <span>{restaurant.priceRange}</span>
                          </div>
                        </div>
                        
                        <div className="dining-out__popular-menu">
                          <span className="dining-out__popular-title">인기 메뉴:</span>
                          <div className="dining-out__menu-items">
                            {restaurant.popularItems.map((item, index) => (
                              <span key={index} className="dining-out__menu-item">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button className="dining-out__vote-button">
                          <FiThumbsUp size={16} />
                          투표하기
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Card>
      
      <Card className="dining-out__stats-card">
        <div className="dining-out__stats-header">
          <h3 className="dining-out__stats-title">현재 투표 현황</h3>
        </div>
        
        <div className="dining-out__stats-content">
          {sortedRestaurants.map(restaurant => (
            <div key={restaurant.id} className="dining-out__stats-item">
              <div className="dining-out__stats-bar-container">
                <div 
                  className="dining-out__stats-bar" 
                  style={{ 
                    width: `${(restaurant.votes / Math.max(...restaurants.map(r => r.votes))) * 100}%` 
                  }}
                />
              </div>
              <div className="dining-out__stats-label">
                <span>{restaurant.name}</span>
                <span className="dining-out__stats-count">{restaurant.votes}표</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </FlexSection>
  );
};

// Mock component for user selection
const UserSelectionPanel = ({ onSelectUser }) => {
  const users = [
    { name: '김영희', department: '개발팀' },
    { name: '이철수', department: '마케팅' },
    { name: '박지민', department: '디자인' },
    { name: '최수진', department: '인사' },
    { name: '정민준', department: '개발팀' },
    { name: '강서연', department: '마케팅' },
    { name: '윤도현', department: '디자인' }
  ];
  
  const departments = [...new Set(users.map(user => user.department))];
  
  return (
    <div className="user-selection-panel">
      {departments.map(department => (
        <div key={department} className="user-selection-department">
          <h3 className="user-selection-department-title">{department}</h3>
          <div className="user-selection-users">
            {users
              .filter(user => user.department === department)
              .map(user => (
                <button
                  key={user.name}
                  className="user-selection-user-button"
                  onClick={() => onSelectUser(user.name)}
                >
                  <FiUser size={16} />
                  {user.name}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiningOut;