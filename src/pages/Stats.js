import React from 'react';
import Card from '../components/card/Card';
import Title from '../components/title/Title';
import "./Stats.scss";
import FlexSection from '../components/section/FlexSection';
import { useVoteData } from '../context/VoteProvider';

const Stats = () => {
  const { userVotes, summary, loading } = useVoteData();

  if (loading) return <p>로딩 중...</p>;

  return (
    <FlexSection>
      <Card className="stats-left">
        <Title>부서별 투표 결과</Title>
        <table className="stats-table">
          <thead>
            <tr>
              <th>부서</th>
              <th>이름</th>
              <th>선택한 메뉴</th>
            </tr>
          </thead>
          <tbody>
            {userVotes.map(({ department, name, menu }) => (
              <tr key={`${department}-${name}`}>
                <td>{department}</td>
                <td>{name}</td>
                <td>{menu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="stats-right">
        <Title>메뉴별 집계</Title>
        <ul className="menu-summary">
          {Object.entries(summary).map(([menu, count]) => (
            <li key={menu} className="menu-item">
              <span className="menu-name">{menu}</span>
              <span className="menu-count">{count}명</span>
            </li>
          ))}
        </ul>
      </Card>
    </FlexSection>
  );
};

export default Stats;
