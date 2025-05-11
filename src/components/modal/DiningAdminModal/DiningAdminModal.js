import React, { useEffect, useRef, useState } from "react";
import "../../styles/components/_diningAdminModal.scss";
import Title from "../../../components/title/DefaultTitle/DefaultTitle";
import Text from "../../../components/text/DefaultText/DefaultText";
import { database } from "../../../firebase/firebase";
import { ref, set, onValue } from "firebase/database";
import { FiX, FiTrash2 } from "react-icons/fi";

const DiningAdminModal = ({ isOpen, onClose }) => {
  const [isExternalEnabled, setIsExternalEnabled] = useState(false);
  const overlayRef = useRef(null);

  // 외식 모드 상태 불러오기
  useEffect(() => {
    if (isOpen) {
      const externalModeRef = ref(database, "settings/externalMode");
      onValue(externalModeRef, (snapshot) => {
        const value = snapshot.val();
        if (typeof value === "boolean") {
          setIsExternalEnabled(value);
        }
      });
    }
  }, [isOpen]);

  // 외식 모드 토글
  const handleToggleExternal = async () => {
    const newStatus = !isExternalEnabled;
    setIsExternalEnabled(newStatus);
    try {
      await set(ref(database, "settings/externalMode"), newStatus);
    } catch (error) {
      console.error("외식 모드 업데이트 실패:", error);
    }
  };

  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // 모든 투표 데이터 삭제
  const handleClearVotes = async () => {
    const confirmDelete = window.confirm(
      "정말로 모든 투표 데이터를 삭제하시겠습니까?"
    );
    if (!confirmDelete) return;

    try {
      await set(ref(database, "votes"), null);
      alert("전체 투표 데이터가 삭제되었습니다.");
    } catch (error) {
      console.error("투표 데이터 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="dining-modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="dining-modal">
        <div className="dining-modal__header">
          <p className="dining-modal__title">설정</p>
          <button className="dining-modal__close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="dining-modal__content">
          <p className="dining-modal__description">
            외식 모드를 활성화하면 전체 사원에게 외식 모드 공지가 생성됩니다.
          </p>

          <div className="dining-modal__toggle-container">
            <div className="dining-modal__toggle-info">
              <Text className="dining-modal__toggle-label">외식 모드</Text>
              <Text
                className={`dining-modal__status ${
                  isExternalEnabled
                    ? "dining-modal__status--enabled"
                    : "dining-modal__status--disabled"
                }`}
              >
                {isExternalEnabled ? "활성화됨" : "비활성화됨"}
              </Text>
            </div>
            <label className="dining-modal__toggle">
              <input
                type="checkbox"
                checked={isExternalEnabled}
                onChange={handleToggleExternal}
              />
              <span className="dining-modal__toggle-slider"></span>
            </label>
          </div>
          <div className="dining-modal__clear-votes">
            <button
              onClick={handleClearVotes}
              className="dining-modal__clear-button"
            >
              <FiTrash2 className="dining-modal__clear-icon" />
              전체 투표 데이터 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningAdminModal;
