// src/context/VoteProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ref, get, onValue, off } from 'firebase/database';
import { database } from '../firebase/firebase';

const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [userVotes, setUserVotes] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [watchTemp, setWatchTemp] = useState(false);

  const fetchVoteData = async () => {
    setLoading(true);
    const todayKey = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const voteRef = ref(database, `votes/${todayKey}`);
    const snapshot = await get(voteRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      setUserVotes(Object.values(data.userVotes || {}));
      setSummary(data.summary || {});
    } else {
      setUserVotes([]);
      setSummary({});
    }

    setLoading(false);
  };

  // ✅ 실시간 리스닝 (잠깐만)
  useEffect(() => {
    if (!watchTemp) return;

    const todayKey = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const voteRef = ref(database, `votes/${todayKey}`);

    const unsubscribe = onValue(voteRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserVotes(Object.values(data.userVotes || {}));
        setSummary(data.summary || {});
      }
    });

    const timer = setTimeout(() => {
      off(voteRef); // 👈 리스너 제거
      setWatchTemp(false);
    }, 3000); // 3초만 리스닝

    return () => {
      clearTimeout(timer);
      off(voteRef);
    };
  }, [watchTemp]);

  useEffect(() => {
    fetchVoteData(); // 최초 진입
  }, []);

  return (
    <VoteContext.Provider value={{ userVotes, summary, loading, setWatchTemp }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteData = () => useContext(VoteContext);
