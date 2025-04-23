import React, { useEffect, useState } from 'react';
import DefaultNotification from '../../notification/DefaultNotification/DefaultNotification';

const VOTE_START_HOUR = 8;
const VOTE_END_HOUR = 11;
const VOTE_END_MINUTE = 30;

const VoteTimerNotification = () => {
  const [now, setNow] = useState(new Date());
  const [isVoteTime, setIsVoteTime] = useState(false);
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setNow(current);

      const start = new Date();
      start.setHours(VOTE_START_HOUR, 0, 0, 0);
      const end = new Date();
      end.setHours(VOTE_END_HOUR, VOTE_END_MINUTE, 0, 0);

      if (current >= start && current <= end) {
        setIsVoteTime(true);
        const diff = end - current;
        const h = Math.floor(diff / 1000 / 60 / 60);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setRemaining(`${h.toString().padStart(2, '0')}시간 ${m.toString().padStart(2, '0')}분 ${s.toString().padStart(2, '0')}초`);
      } else {
        setIsVoteTime(false);
        setRemaining('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DefaultNotification type="speaker">
        투표 가능 시간은 <strong>오전 8:00 ~ 오전 11:30</strong>입니다.
      </DefaultNotification>
      {isVoteTime ? (
        <DefaultNotification type="success">
          지금은 투표 가능 시간입니다. <br />
          ⏰<strong>{remaining}</strong> 남았습니다!
        </DefaultNotification>
      ) : (
        <DefaultNotification type="warning">
          현재는 투표 시간이 아닙니다.<br />
          오전 8:00 이후에 다시 시도해주세요.
        </DefaultNotification>
      )}
    </>
  );
};

export default VoteTimerNotification;
