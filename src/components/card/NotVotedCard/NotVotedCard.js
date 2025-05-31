import React from "react";
import { FiUser, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import Text from "../../text/DefaultText/DefaultText";
import styles from "./NotVotedCard.module.scss";

const NotVotedCard = ({ notVotedUsers }) => {
  const isEmpty = notVotedUsers.length === 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FiAlertCircle size={18} />
          <h3>투표하지 않은 명단</h3>
        </div>
        <span className={styles.badge}>{notVotedUsers.length}명</span>
      </div>
      <div className={styles.content}>
        {isEmpty ? (
          <div className={styles.empty}>
            <FiCheckCircle size={48} />
            <Text>모든 인원이 투표를 완료했습니다 🎉</Text>
          </div>
        ) : (
          <ul className={styles.list}>
            {notVotedUsers.map(({ name, department }) => (
              <li key={`${department}-${name}`} className={styles.listItem}>
                <FiUser size={14} />
                <span className={styles.department}>{department}</span>
                <span className={styles.name}>{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotVotedCard;
