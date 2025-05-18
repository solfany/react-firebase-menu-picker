import React from "react";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import Title from "../../title/DefaultTitle/DefaultTitle";
import Text from "../../text/DefaultText/DefaultText";
import styles from "./InternalRestaurantCard.module.scss";

const InternalRestaurantCard = ({
  restaurant,
  dayName,
  formattedDate,
  todayMenus = [],
  todayCategories = [],
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Title variant="primary" icon={<FiMapPin size={24} />}>
          오늘의 식당: {restaurant}
        </Title>
      </div>
      <div className={styles.content}>
        <div className={styles.dateInfo}>
          <FiCalendar size={16} />
          <Text>
            {formattedDate} ({dayName})
          </Text>
        </div>
        <h3 className={styles.title}>메뉴판 미리보기</h3>
        {todayCategories?.length > 0 ? (
          <div className={styles.categories}>
            {todayCategories.map((category, idx) => (
              <div key={idx} className={styles.category}>
                <h4 className={styles.categoryTitle}>
                  {category.label}
                  <span className={styles.count}>
                    {category.items.length}개
                  </span>
                </h4>
                <ul className={styles.menuList}>
                  {category.items.map((item, i) => (
                    <li key={i} className={styles.menuItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className={styles.menuList}>
            {todayMenus.map((item, i) => (
              <li key={i} className={styles.menuItem}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InternalRestaurantCard;
