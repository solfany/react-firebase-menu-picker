import React from 'react';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import Title from '../../title/DefaultTitle/DefaultTitle';
import Text from '../../text/DefaultText/DefaultText';
import styles from './ExternalRestaurantCard.module.scss';

const ExternalRestaurantCard = ({
  dayName,
  formattedDate,
  todayCategories = []
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Title variant="primary" icon={<FiMapPin size={24} />}>
          오늘의 외식 카테고리
        </Title>
      </div>

      <div className={styles.content}>
        <div className={styles.dateInfo}>
          <FiCalendar size={16} />
          <Text>{formattedDate} ({dayName})</Text>
        </div>

        <h3 className={styles.title}>요리 카테고리 미리보기</h3>

        {todayCategories?.length > 0 ? (
          <ul className={styles.menuList}>
            {todayCategories.map((category, idx) => (
              <li key={idx} className={styles.menuItem}>
                {category.label}
              </li>
            ))}
          </ul>
        ) : (
          <Text>외식 카테고리가 없습니다.</Text>
        )}
      </div>
    </div>
  );
};

export default ExternalRestaurantCard;
