import React from 'react';
import './DepartmentVote.scss';
import DefaultButton from '../button/DefaultBuutton/DefaultButton';
import usersData from '../../data/users.json';

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
    <div className="department-vote">
      {Object.entries(groupedUsers).map(([dept, names]) => (
        <div key={dept} className="department-block">
          <h4>{dept}</h4>
          <div className="user-list">
            {names.map((name) => (
              <DefaultButton
                key={name}
                className={selectedUser === name ? 'selected' : 'unselected'}
                onClick={() => onSelectUser(name)}
              >
                {name}
              </DefaultButton>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentVote;
