import React, { useEffect, useState } from "react";
import { useVoteData } from "../../../context/VoteProvider";
import DefaultNotification from "../../notification/DefaultNotification/DefaultNotification";
import voteTimeConfig from "../../../data/voteTime.json";

const VoteTimerNotification = () => {
  const { externalMode } = useVoteData();
  const [isVoteTime, setIsVoteTime] = useState(false);
  const [remaining, setRemaining] = useState("");

  const { startHour, startMinute, endHour, endMinute } = voteTimeConfig;

  useEffect(() => {
    const checkVoteTime = () => {
      const now = new Date();

      const start = new Date();
      start.setHours(startHour, startMinute, 0, 0);

      const end = new Date();
      end.setHours(endHour, endMinute, 0, 0);

      const withinVoteTime = now >= start && now <= end;
      setIsVoteTime(withinVoteTime);

      if (withinVoteTime) {
        const diff = end - now;
        const h = Math.floor(diff / 1000 / 60 / 60);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setRemaining(
          `${h.toString().padStart(2, "0")}시간 ${m
            .toString()
            .padStart(2, "0")}분 ${s.toString().padStart(2, "0")}초`
        );
      } else {
        setRemaining("");
      }
    };

    checkVoteTime();

    const interval = setInterval(checkVoteTime, 1000);
    return () => clearInterval(interval);
  }, [startHour, startMinute, endHour, endMinute]);

  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? "오후" : "오전";
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${period} ${formattedHour}:${formattedMinute}`;
  };

  return (
    <>
      <DefaultNotification type="speaker" key="vote-time-info">
        투표 가능 시간은{" "}
        <strong>
          {formatTime(startHour, startMinute)} ~{" "}
          {formatTime(endHour, endMinute)}
        </strong>{" "}
        입니다.
      </DefaultNotification>

      <DefaultNotification
        type={isVoteTime ? "success" : "time"}
        key={isVoteTime ? "vote-open" : "vote-closed"}
      >
        {isVoteTime ? (
          <>
            지금은 투표 가능 시간입니다.
            <br />⏰ <strong>{remaining}</strong> 남았습니다!
          </>
        ) : (
          <>
            현재는 투표 시간이 아닙니다.
            <br />
            {formatTime(startHour, startMinute)} 이후에 다시 시도해주세요.
          </>
        )}
      </DefaultNotification>

      {externalMode && (
        <DefaultNotification type="info" key="external-mode">
          오늘은 외식 예정입니다.
        </DefaultNotification>
      )}
    </>
  );
};

export default VoteTimerNotification;
