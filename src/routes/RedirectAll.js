import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TARGET = "http://211.234.108.224:8081";

export default function RedirectAll() {
  const location = useLocation();

  useEffect(() => {
    // 단순 루트로 보냄
    window.location.replace(TARGET);

    // 🔄 원래 경로 보존하려면 아래 3줄로 교체:
    // const next = new URL(location.pathname + location.search + location.hash, TARGET);
    // window.location.replace(next.toString());
  }, [location]);

  return null;
}
