import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSave, FiMapPin, FiClock, FiDollarSign, FiTag } from 'react-icons/fi';
import FlexSection from '../../components/section/FlexSection/FlexSection';
import Card from '../../components/card/DefaultCard/DefaultCard';
import Title from '../../components/title/DefaultTitle/DefaultTitle';
import Text from '../../components/text/DefaultText/DefaultText';
import '../../styles/pages/_diningAdmin.scss';

const DiningAdmin = () => {
  const [isExternalEnabled, setIsExternalEnabled] = useState(false);
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: '김밥천국',
      distance: '도보 5분',
      cuisine: '분식',
      priceRange: '₩',
      popularItems: ['김밥', '라면', '비빔밥']
    },
    {
      id: 2,
      name: '백반집',
      distance: '도보 7분',
      cuisine: '한식',
      priceRange: '₩₩',
      popularItems: ['제육볶음', '된장찌개', '김치찌개']
    }
  ]);
  
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    distance: '',
    cuisine: '',
    priceRange: '₩',
    popularItems: []
  });
  
  const [newItemInput, setNewItemInput] = useState('');
  
  const handleToggleExternal = () => {
    setIsExternalEnabled(!isExternalEnabled);
  };
  
  const handleAddRestaurant = () => {
    if (newRestaurant.name && newRestaurant.distance) {
      setRestaurants([
        ...restaurants,
        {
          id: Date.now(),
          ...newRestaurant
        }
      ]);
      setNewRestaurant({
        name: '',
        distance: '',
        cuisine: '',
        priceRange: '₩',
        popularItems: []
      });
    }
  };
  
  const handleDeleteRestaurant = (id) => {
    setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
  };
  
  const handleAddPopularItem = (e) => {
    e.preventDefault();
    if (newItemInput.trim()) {
      setNewRestaurant({
        ...newRestaurant,
        popularItems: [...newRestaurant.popularItems, newItemInput.trim()]
      });
      setNewItemInput('');
    }
  };
  
  const handleRemovePopularItem = (index) => {
    setNewRestaurant({
      ...newRestaurant,
      popularItems: newRestaurant.popularItems.filter((_, i) => i !== index)
    });
  };
  
  return (
    <FlexSection className="dining-admin">
      <Card className="dining-admin__main-card">
        <div className="dining-admin__header">
          <Title variant="primary">외식 관리</Title>
          <div className="dining-admin__toggle-container">
            <Text>외식 모드</Text>
            <label className="dining-admin__toggle">
              <input 
                type="checkbox" 
                checked={isExternalEnabled} 
                onChange={handleToggleExternal} 
              />
              <span className="dining-admin__toggle-slider"></span>
            </label>
            <Text className={isExternalEnabled ? 'dining-admin__status--enabled' : 'dining-admin__status--disabled'}>
              {isExternalEnabled ? '활성화됨' : '비활성화됨'}
            </Text>
          </div>
        </div>
        
        <div className="dining-admin__content">
          <div className="dining-admin__restaurants">
            <h3 className="dining-admin__subtitle">등록된 외식 장소</h3>
            
            {restaurants.length > 0 ? (
              <div className="dining-admin__restaurant-list">
                {restaurants.map(restaurant => (
                  <div key={restaurant.id} className="dining-admin__restaurant-item">
                    <div className="dining-admin__restaurant-details">
                      <h4 className="dining-admin__restaurant-name">
                        {restaurant.name}
                      </h4>
                      <div className="dining-admin__restaurant-info">
                        <span className="dining-admin__info-item">
                          <FiMapPin />
                          {restaurant.distance}
                        </span>
                        <span className="dining-admin__info-item">
                          <FiTag />
                          {restaurant.cuisine}
                        </span>
                        <span className="dining-admin__info-item">
                          <FiDollarSign />
                          {restaurant.priceRange}
                        </span>
                      </div>
                      <div className="dining-admin__popular-items">
                        <span className="dining-admin__popular-label">인기 메뉴:</span>
                        {restaurant.popularItems.join(', ')}
                      </div>
                    </div>
                    <button 
                      className="dining-admin__delete-button"
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dining-admin__empty-state">
                <Text>등록된 외식 장소가 없습니다. 새로운 장소를 추가해보세요.</Text>
              </div>
            )}
          </div>
          
          <div className="dining-admin__add-restaurant">
            <h3 className="dining-admin__subtitle">새 외식 장소 추가</h3>
            
            <div className="dining-admin__form">
              <div className="dining-admin__form-row">
                <div className="dining-admin__form-group">
                  <label className="dining-admin__label">식당 이름</label>
                  <input 
                    type="text" 
                    className="dining-admin__input" 
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                    placeholder="식당 이름 입력"
                  />
                </div>
                
                <div className="dining-admin__form-group">
                  <label className="dining-admin__label">거리</label>
                  <input 
                    type="text" 
                    className="dining-admin__input" 
                    value={newRestaurant.distance}
                    onChange={(e) => setNewRestaurant({...newRestaurant, distance: e.target.value})}
                    placeholder="예: 도보 5분, 차로 10분"
                  />
                </div>
              </div>
              
              <div className="dining-admin__form-row">
                <div className="dining-admin__form-group">
                  <label className="dining-admin__label">음식 종류</label>
                  <input 
                    type="text" 
                    className="dining-admin__input" 
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})}
                    placeholder="예: 한식, 일식, 양식"
                  />
                </div>
                
                <div className="dining-admin__form-group">
                  <label className="dining-admin__label">가격대</label>
                  <select 
                    className="dining-admin__select" 
                    value={newRestaurant.priceRange}
                    onChange={(e) => setNewRestaurant({...newRestaurant, priceRange: e.target.value})}
                  >
                    <option value="₩">₩ (저렴)</option>
                    <option value="₩₩">₩₩ (보통)</option>
                    <option value="₩₩₩">₩₩₩ (비쌈)</option>
                  </select>
                </div>
              </div>
              
              <div className="dining-admin__form-group">
                <label className="dining-admin__label">인기 메뉴</label>
                <div className="dining-admin__popular-items-input">
                  <form onSubmit={handleAddPopularItem} className="dining-admin__item-form">
                    <input 
                      type="text" 
                      className="dining-admin__input" 
                      value={newItemInput}
                      onChange={(e) => setNewItemInput(e.target.value)}
                      placeholder="인기 메뉴 추가"
                    />
                    <button 
                      type="submit" 
                      className="dining-admin__add-item-button"
                    >
                      <FiPlus />
                    </button>
                  </form>
                </div>
                
                {newRestaurant.popularItems.length > 0 && (
                  <div className="dining-admin__tags">
                    {newRestaurant.popularItems.map((item, index) => (
                      <span key={index} className="dining-admin__tag">
                        {item}
                        <button 
                          className="dining-admin__tag-remove" 
                          onClick={() => handleRemovePopularItem(index)}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                className="dining-admin__submit-button"
                onClick={handleAddRestaurant}
                disabled={!newRestaurant.name || !newRestaurant.distance}
              >
                <FiPlus /> 새 식당 추가하기
              </button>
            </div>
          </div>
        </div>
      </Card>
    </FlexSection>
  );
};

export default DiningAdmin;