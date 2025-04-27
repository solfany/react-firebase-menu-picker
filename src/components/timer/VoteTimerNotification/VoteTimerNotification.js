import React, { useEffect, useState } from 'react';
import { useVoteData } from '../../../context/VoteProvider'; // 🔥 추가
import DefaultNotification from '../../notification/DefaultNotification/DefaultNotification';
import voteTimeConfig from '../../../data/voteTime.json';

const VoteTimerNotification = () => {
  const { externalMode } = useVoteData(); // 🔥 context에서 가져오기
  const [now, setNow] = useState(new Date());
  const [isVoteTime, setIsVoteTime] = useState(false);
  const [remaining, setRemaining] = useState('');

  const { startHour, startMinute, endHour, endMinute } = voteTimeConfig;

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setNow(current);

      const start = new Date();
      start.setHours(startHour, startMinute, 0, 0);
      const end = new Date();
      end.setHours(endHour, endMinute, 0, 0);

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
  }, [startHour, startMinute, endHour, endMinute]);

  const formatTime = (hour, minute) => {
    const h = hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
    const m = minute.toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return (
    <>
      <DefaultNotification type="speaker">
        투표 가능 시간은 <strong>{formatTime(startHour, startMinute)} ~ {formatTime(endHour, endMinute)}</strong>입니다.
      </DefaultNotification>

      {isVoteTime ? (
        <DefaultNotification type="success">
          지금은 투표 가능 시간입니다. <br />
          ⏰<strong>{remaining}</strong> 남았습니다!
        </DefaultNotification>
      ) : (
        <DefaultNotification type="time">
          현재는 투표 시간이 아닙니다.<br />
          {formatTime(startHour, startMinute)} 이후에 다시 시도해주세요.
        </DefaultNotification>
      )}

      {externalMode && (
        <DefaultNotification type="info">
          오늘은 외식 예정입니다.
        </DefaultNotification>
      )}
    </>
  );
};

export default VoteTimerNotification;
