// src/context/VoteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/firebase';

const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [userVotes, setUserVotes] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchVoteData = async () => {
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

  useEffect(() => {
    fetchVoteData();
  }, []);

  return (
    <VoteContext.Provider value={{ userVotes, summary, loading }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteData = () => useContext(VoteContext);
