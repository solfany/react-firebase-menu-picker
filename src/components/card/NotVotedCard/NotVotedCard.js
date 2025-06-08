import React, { useState, useEffect, useRef } from "react";
import { FiUser, FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import Text from "../../text/DefaultText/DefaultText";
import styles from "./NotVotedCard.module.scss";
import { database } from "../../../firebase/firebase";
import { ref, set, onValue } from "firebase/database";

const STATUS = {
  OUT: "외근",
  VACATION: "휴가",
  SKIP_LUNCH: "점심 제외",
};

const NotVotedCard = ({ notVotedUsers }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStatuses, setUserStatuses] = useState({});
  const overlayRef = useRef(null);

  useEffect(() => {
    const statusRef = ref(database, "notVotedUsers");
    onValue(statusRef, (snapshot) => {
      const data = snapshot.val() || {};
      setUserStatuses(data);
    });
  }, []);

  const openModal = (name, department) => {
    setSelectedUser({ name, department });
    setModalVisible(true);
  };

  const updateUserStatus = (name, department, status) => {
    const userRef = ref(database, `notVotedUsers/${name}`);
    set(userRef, { department, status });
    setModalVisible(false);
  };

  const clearUserStatus = (name) => {
    const userRef = ref(database, `notVotedUsers/${name}`);
    set(userRef, null);
    setModalVisible(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      setModalVisible(false);
    }
  };

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
              <li
                key={`${department}-${name}`}
                className={styles.listItem}
                onClick={() => openModal(name, department)}
              >
                <FiUser size={14} />
                <span className={styles.department}>{department}</span>
                <span className={styles.name}>{name}</span>
                {userStatuses[name]?.status && (
                  <span
                    className={`${styles.statusBadge} ${
                      styles[userStatuses[name].status]
                    }`}
                  >
                    {userStatuses[name].status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {modalVisible && selectedUser && (
        <div
          className={styles["lunch-modal-overlay"]}
          ref={overlayRef}
          onClick={handleOverlayClick}
        >
          <div className={styles["lunch-modal"]}>
            <div className={styles["lunch-modal__header"]}>
              <p className={styles["lunch-modal__title"]}>
                {selectedUser.name}님의 상태를 선택해주세요
              </p>
              <button
                className={styles["lunch-modal__close-btn"]}
                onClick={() => setModalVisible(false)}
              >
                <FiX />
              </button>
            </div>

            <div className={styles["lunch-modal__content"]}>
              <button
                className={styles["lunch-modal__button"]}
                onClick={() =>
                  updateUserStatus(
                    selectedUser.name,
                    selectedUser.department,
                    STATUS.SKIP_LUNCH
                  )
                }
              >
                점심 제외
              </button>
              <button
                className={styles["lunch-modal__button"]}
                onClick={() =>
                  updateUserStatus(
                    selectedUser.name,
                    selectedUser.department,
                    STATUS.OUT
                  )
                }
              >
                외근
              </button>
              <button
                className={styles["lunch-modal__button"]}
                onClick={() =>
                  updateUserStatus(
                    selectedUser.name,
                    selectedUser.department,
                    STATUS.VACATION
                  )
                }
              >
                휴가
              </button>
              {userStatuses[selectedUser.name]?.status && (
                <button
                  className={`${styles["lunch-modal__button"]} ${styles["lunch-modal__button--cancel"]}`}
                  onClick={() => clearUserStatus(selectedUser.name)}
                >
                  상태 초기화
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotVotedCard;
