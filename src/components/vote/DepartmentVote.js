import React from 'react';
import styles from './DepartmentVote.module.scss';
import usersData from '../../data/users.json';
import { FiUser } from 'react-icons/fi';

const groupByDepartment = (users) => {
  return users.reduce((acc, user) => {
    if (!acc[user.department]) {
      acc[user.department] = [];
    }
    acc[user.department].push(user.name);
    return acc;
  }, {});
};

const DepartmentVote = ({ selectedUser = '', onSelectUser = () => {} }) => {
  const groupedUsers = groupByDepartment(usersData);

  return (
    <div className={styles.panel}>
      {Object.entries(groupedUsers).map(([dept, names]) => (
        <div key={dept} className={styles.department}>
          <h3 className={styles.departmentTitle}>{dept}</h3>
          <div className={styles.users}>
            {names.map((name) => (
              <button
                key={name}
                className={`${styles.userButton} ${selectedUser === name ? styles.active : ''}`}
                onClick={() => onSelectUser(name)}
              >
                <FiUser size={16} />
                {name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentVote;
