import React, { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import DiningModeToggle from "../../toggle/DiningModeToggle/DiningModeToggle";
import DepartmentVote from "../../vote/DepartmentVote";
import MenuSelect from "../../select/MenuSelect/MenuSelect";
import ExternalRestaurantSelect from "../ExternalRestaurantSelect/ExternalRestaurantSelect";
import styles from "./UserDiningSelector.module.scss";

const UserDiningSelector = ({
  selectedUser,
  setSelectedUser,
  diningMode,
  setDiningMode,
  isExternalEnabled,
  externalRestaurants,
}) => {
  //  외식 모드 꺼져있을 때 강제 사내식당 모드로
  useEffect(() => {
    if (!isExternalEnabled && diningMode === "external") {
      setDiningMode("internal");
    }
  }, [isExternalEnabled, diningMode, setDiningMode]);

  return (
    <>
      <div className={styles["user-dining-selector__toggle"]}>
        <DiningModeToggle
          diningMode={diningMode}
          setDiningMode={setDiningMode}
          internalDisabled={false}
          externalDisabled={!isExternalEnabled} //  외식 모드 꺼지면 외식 버튼 비활성화
        />

        {selectedUser ? (
          <div className={styles["user-dining-selector__selected-user"]}>
            <FiUser size={16} />
            <span>{selectedUser}</span>
            <button
              className={styles["user-dining-selector__selected-user-button"]}
              onClick={() => setSelectedUser(null)}
            >
              변경
            </button>
          </div>
        ) : (
          <div className={styles["user-dining-selector__prompt"]}>
            <FiUser size={16} />
            <span>투표할 사원을 선택하세요</span>
          </div>
        )}
      </div>

      {!selectedUser ? (
        <DepartmentVote
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      ) : diningMode === "internal" ? (
        <MenuSelect
          user={selectedUser}
          onComplete={() => setSelectedUser(null)}
        />
      ) : (
        <ExternalRestaurantSelect
          user={selectedUser}
          restaurants={externalRestaurants}
          onComplete={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

export default UserDiningSelector;
