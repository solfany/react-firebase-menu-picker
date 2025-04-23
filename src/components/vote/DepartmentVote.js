import React from 'react';
import './DepartmentVote.module.scss';
import DefaultButton from '../button/DefaultBuutton/DefaultButton';
import usersData from '../../data/users.json';
import { FiUser} from 'react-icons/fi';

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
      <div className="user-selection-panel">
        {Object.entries(groupedUsers).map(([dept, names]) => (
          <div key={dept} className="user-selection-department">
            <h3 className="user-selection-department-title">{dept}</h3>
            <div className="user-selection-users">
              {names.map((name) => (
                <button
                  key={name}
                  className={`user-selection-user-button ${selectedUser === name ? 'active' : ''}`}
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