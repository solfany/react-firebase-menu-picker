import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { ref, get, onValue, off } from "firebase/database";
import { database } from "../firebase/firebase";

const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [userVotes, setUserVotes] = useState([]);
  const [summary, setSummary] = useState({});
  const [externalMode, setExternalMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const todayKeyRef = useRef(
    new Date().toISOString().slice(0, 10).replace(/-/g, "")
  );
  const pollingInterval = useRef(null);

  const fetchVoteData = async () => {
    const voteDataRef = ref(database, `votes/${todayKeyRef.current}`);
    const snapshot = await get(voteDataRef);

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

  const startWatching = () => {
    if (pollingInterval.current) return;
    pollingInterval.current = setInterval(() => {
      fetchVoteData();
    }, 5000); // 5초 주기로 데이터 polling
  };

  const stopWatching = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  };

  useEffect(() => {
    fetchVoteData(); // 최초 진입 시 로드
    startWatching(); // 통계 페이지에서 반영되도록 기본 감시
    return () => stopWatching();
  }, []);

  useEffect(() => {
    const externalRef = ref(database, "settings/externalMode");
    const unsubscribe = onValue(externalRef, (snapshot) => {
      setExternalMode(!!snapshot.val());
    });
    return () => off(externalRef);
  }, []);

  return (
    <VoteContext.Provider
      value={{
        userVotes,
        summary,
        externalMode,
        loading,
        refetchVoteData: fetchVoteData,
        startWatching,
        stopWatching,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteData = () => useContext(VoteContext);
