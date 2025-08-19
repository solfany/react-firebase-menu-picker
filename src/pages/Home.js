import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Server,
  Star,
  Heart,
  ExternalLink,
  Bookmark,
  Globe,
  Shield,
  Zap,
  CheckCircle
} from "lucide-react";

// 레이아웃 컨테이너
const FlexSection = ({ children }) => (
  <div
    className="flex-section"
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "clamp(0px, 4vw, 10px)"
    }}
  >
    {children}
  </div>
);

// 카드
const Card = ({ children, className = "" }) => (
  <div className={`migration-card ${className}`}>{children}</div>
);

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const newUrl = "---";

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(newUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      alert("클립보드 복사에 실패했어요. 주소를 직접 복사해 주세요.");
    }
  };

  const handleVisitSite = () => {
    const w = window.open(newUrl, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = newUrl;
  };

  return (
    <FlexSection>
      <Card className={isVisible ? "visible" : ""}>
        <div className="migration-content">
          {/* Header */}
          <div className="migration-header">
            <div className="logo-section">
              <div className="logo-circle">
                <Server className="logo-icon" aria-hidden="true" />
              </div>
              <h1 className="brand-title">
                <span className="brand-name">Npicker</span>
                <span className="brand-subtitle">서버 이관 안내</span>
              </h1>
            </div>
          </div>

          {/* Thanks */}
          <div className="thank-you-section">
            <div className="thank-you-icon">
              <Heart className="heart-icon" aria-hidden="true" />
            </div>
            <p className="thank-you-text">
              그동안 <strong>Npicker</strong>를 사용해주셔서 진심으로 감사합니다
            </p>
          </div>

          {/* Notice */}
          <div className="migration-notice">
            <div className="notice-icon">
              <Shield className="shield-icon" aria-hidden="true" />
            </div>
            <div className="notice-content">
              <h3 className="notice-title">서버 이관 안내</h3>
              <p className="notice-description">
                더 안정적인 서비스 제공을 위해 새로운 서버로 이전하였습니다.
                아래 새 주소로 접속해주세요.
              </p>
            </div>
          </div>

          {/* URL */}
          <div className="url-section">
            <div className="url-label">
              <Globe className="globe-icon" aria-hidden="true" />
              새로운 주소
            </div>
            <div className="url-container">
              <div className="url-display" role="textbox" aria-readonly="true" tabIndex={0}>
                <code className="url-text">{newUrl}</code>
              </div>
              <div className="url-actions">
                <button
                  className="copy-button"
                  onClick={handleCopyUrl}
                  title="주소 복사"
                  aria-label="주소 복사"
                >
                  {copied ? (
                    <CheckCircle className="action-icon" aria-hidden="true" />
                  ) : (
                    <Bookmark className="action-icon" aria-hidden="true" />
                  )}
                  {copied ? "복사됨!" : "복사"}
                </button>
                <button
                  className="visit-button"
                  onClick={handleVisitSite}
                  title="새 사이트로 이동"
                  aria-label="새 사이트로 이동"
                >
                  <ExternalLink className="action-icon" aria-hidden="true" />
                  사이트 이동
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="instructions-section">
            <div className="instruction-item">
              <div className="instruction-number">1</div>
              <div className="instruction-content">
                <h4 className="instruction-title">브라우저 즐겨찾기 업데이트</h4>
                <p className="instruction-desc">기존 즐겨찾기를 새 주소로 변경해주세요</p>
              </div>
            </div>
            <div className="instruction-item">
              <div className="instruction-number">2</div>
              <div className="instruction-content">
                <h4 className="instruction-title">새 사이트에서 메뉴 선택</h4>
                <p className="instruction-desc">이전과 동일한 방식으로 메뉴를 선택하실 수 있습니다</p>
              </div>
            </div>
            <div className="instruction-item">
              <div className="instruction-number">3</div>
              <div className="instruction-content">
                <h4 className="instruction-title">개선된 서비스 이용</h4>
                <p className="instruction-desc">더욱 빠르고 안정적인 서비스를 경험하세요</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="features-section">
            <h3 className="features-title">새로워진 Npicker</h3>
            <div className="features-grid">
              <div className="feature-item">
                <Zap className="feature-icon" aria-hidden="true" />
                <span className="feature-text">더 빠른 속도</span>
              </div>
              <div className="feature-item">
                <Shield className="feature-icon" aria-hidden="true" />
                <span className="feature-text">향상된 보안</span>
              </div>
              <div className="feature-item">
                <Star className="feature-icon" aria-hidden="true" />
                <span className="feature-text">개선된 UI</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="cta-section" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            <button className="cta-button" onClick={handleVisitSite}>
              <span>지금 새 사이트로 이동하기</span>
              <ArrowRight className="cta-icon" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Decorations */}
        <div className="decoration-circle decoration-circle-1" aria-hidden="true"></div>
        <div className="decoration-circle decoration-circle-2" aria-hidden="true"></div>
        <div className="decoration-circle decoration-circle-3" aria-hidden="true"></div>
      </Card>

      <style jsx>{`
        .migration-card * { box-sizing: border-box; }

        .migration-card {
          position: relative;
          width: min(100%, 860px);
          max-width: clamp(320px, 92vw, 860px);
          background: rgba(255, 255, 255, 0.95); /* ✅ 기존 밝은 배경 유지 */
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: clamp(20px, 4vw, 48px);
          box-shadow:
            0 32px 64px rgba(0, 0, 0, 0.12),
            0 16px 32px rgba(0, 0, 0, 0.08);
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity .6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform .6s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .migration-card.visible { opacity: 1; transform: translateY(0) scale(1); }

        .migration-content { position: relative; z-index: 2; display: flex; flex-direction: column; gap: clamp(16px, 2.5vw, 32px); }
        .migration-header { text-align: center; }

        .logo-section { display: flex; flex-direction: column; align-items: center; gap: 1rem; }

        .logo-circle {
          width: clamp(64px, 8vw, 90px);
          height: clamp(64px, 8vw, 90px);
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(59,130,246,.3);
        }
        .logo-icon { width: clamp(32px, 5vw, 48px); height: clamp(32px, 5vw, 48px); color: #fff; }

        .brand-title { display: flex; flex-direction: column; gap: .25rem; }
        .brand-name {
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        .brand-subtitle {
          font-size: clamp(.95rem, 1.8vw, 1.125rem);
          color: #64748b;
          font-weight: 600;
          margin: 0;
        }

        .thank-you-section {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.25rem;
          background: linear-gradient(135deg, rgba(236,72,153,.1), rgba(168,85,247,.1));
          border-radius: 16px;
          border: 1px solid rgba(236,72,153,.2);
        }
        .heart-icon { width: 28px; height: 28px; color: #ec4899; animation: heartbeat 2s ease-in-out infinite; }
        @keyframes heartbeat { 0%,100% {transform: scale(1)} 50% {transform: scale(1.1)} }
        .thank-you-text { font-size: clamp(1rem, 2vw, 1.125rem); color: #1f2937; margin: 0; line-height: 1.6; }

        .migration-notice {
          display: flex; gap: 1rem; align-items: flex-start;
          padding: 1.25rem;
          background: linear-gradient(135deg, rgba(59,130,246,.1), rgba(37,99,235,.1));
          border-radius: 16px; border: 1px solid rgba(59,130,246,.2);
        }
        .shield-icon { width: 26px; height: 26px; color: #3b82f6; }
        .notice-title { font-size: clamp(1.05rem, 2vw, 1.25rem); font-weight: 800; color: #1f2937; margin: 0 0 .35rem; }
        .notice-description { color: #4b5563; margin: 0; line-height: 1.6; }

        .url-section {
          padding: 1.25rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 16px; border: 1px solid #e2e8f0;
        }
        .url-label { display: flex; align-items: center; gap: .5rem; font-weight: 700; color: #374151; margin-bottom: .75rem; }
        .globe-icon { width: 20px; height: 20px; color: #059669; }

        .url-container { display: grid; gap: 1rem; grid-template-columns: 1fr; }
        .url-display {
          padding: 1rem; background: #fff; border: 2px solid #e5e7eb; border-radius: 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          overflow: auto;
        }
        .url-text { font-size: clamp(.95rem, 2vw, 1rem); color: #065f46; font-weight: 700; word-break: break-all; }

        .url-actions { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
        .copy-button, .visit-button {
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: .8rem 1.2rem; border: none; border-radius: 12px;
          font-weight: 700; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .copy-button { background: linear-gradient(135deg, #f3f4f6, #e5e7eb); color: #374151; border: 1px solid #d1d5db; }
        .copy-button:hover { background: linear-gradient(135deg, #e5e7eb, #d1d5db); transform: translateY(-1px); }
        .visit-button { background: linear-gradient(135deg, #3b82f6, #1e40af); color: #fff; box-shadow: 0 4px 12px rgba(59,130,246,.3); }
        .visit-button:hover { background: linear-gradient(135deg, #1e40af, #1e3a8a); transform: translateY(-1px); box-shadow: 0 6px 16px rgba(59,130,246,.4); }
        .action-icon { width: 18px; height: 18px; }

        .instructions-section { display: grid; gap: 1rem; }
        .instruction-item { display: grid; grid-template-columns: auto 1fr; gap: 1rem; padding: 1rem;
          background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; }
        .instruction-item:hover { border-color: #3b82f6; box-shadow: 0 4px 12px rgba(59,130,246,.1); }
        .instruction-number {
          width: 32px; height: 32px; background: linear-gradient(135deg,#3b82f6,#1e40af);
          color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: .875rem;
        }
        .instruction-title { font-size: 1rem; font-weight: 700; color: #1f2937; margin: 0 0 .25rem; }
        .instruction-desc { font-size: .9rem; color: #6b7280; margin: 0; line-height: 1.5; }

        .features-section { text-align: center; }
        .features-title { font-size: clamp(1.1rem, 2.2vw, 1.25rem); font-weight: 800; color: #1f2937; margin: 0 0 1rem; }
        .features-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        .feature-item { display: flex; flex-direction: column; align-items: center; gap: .5rem; padding: 1rem;
          background: linear-gradient(135deg, rgba(59,130,246,.05), rgba(168,85,247,.05));
          border-radius: 12px; border: 1px solid rgba(59,130,246,.1);
        }
        .feature-item:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(59,130,246,.15); }
        .feature-icon { width: 24px; height: 24px; color: #3b82f6; }
        .feature-text { font-size: .9rem; font-weight: 700; color: #374151; }

        .cta-section { text-align: center; margin-top: .5rem; }
        .cta-button {
          display: inline-flex; align-items: center; gap: .75rem; padding: 1rem 2rem;
          background: linear-gradient(135deg, #059669, #047857); color: #fff; border: none; border-radius: 16px;
          font-size: clamp(1rem, 2.2vw, 1.125rem); font-weight: 800; cursor: pointer; transition: transform .3s ease, box-shadow .3s ease, background .3s ease;
          box-shadow: 0 8px 32px rgba(5,150,105,.3);
        }
        .cta-button:hover { background: linear-gradient(135deg, #047857, #065f46); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(5,150,105,.4); }
        .cta-icon { width: 20px; height: 20px; transition: transform .2s ease; }
        .cta-button:hover .cta-icon { transform: translateX(4px); }

        /* Decorations */
        .decoration-circle { position: absolute; border-radius: 50%;
          background: linear-gradient(135deg, rgba(59,130,246,.1), rgba(168,85,247,.1)); z-index: 1; }
        .decoration-circle-1 { width: 120px; height: 120px; top: -60px; right: -60px; animation: float 6s ease-in-out infinite; }
        .decoration-circle-2 { width: 80px; height: 80px; bottom: -40px; left: -40px; animation: float 8s ease-in-out infinite reverse; }
        .decoration-circle-3 { width: 60px; height: 60px; top: 20%; left: -30px; animation: float 10s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(0) } 50% { transform: translateY(-18px) rotate(180deg) } }

        /* ========== RESPONSIVE ONLY (색상 변경 없음) ========== */
        /* ≤ 1024px */
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
        /* ≤ 768px */
        @media (max-width: 768px) {
          .migration-card { border-radius: 20px; }
          .features-grid { grid-template-columns: 1fr; }
        }
        /* ≤ 640px */
        @media (max-width: 640px) {
          .migration-card { padding: 15px; margin: 0px; }
          .url-actions { grid-template-columns: 1fr; }
          .instruction-item { grid-template-columns: 1fr; text-align: center; }
          .decoration-circle-1, .decoration-circle-2, .decoration-circle-3 { display: none; }
        }
        /* ≤ 480px */
        @media (max-width: 480px) {
          .thank-you-section, .migration-notice, .url-section { padding: 1rem; }
          .copy-button, .visit-button { padding: .9rem 1rem; }
          .instruction-number { width: 28px; height: 28px; font-size: .8rem; }
        }

        /* 모션 감축만 유지 (색상 영향 없음) */
        @media (prefers-reduced-motion: reduce) {
          .heart-icon, .decoration-circle-1, .decoration-circle-2, .decoration-circle-3 { animation: none !important; }
          .migration-card { transition: none; }
        }

        .migration-card, .copy-button, .visit-button, .feature-item, .cta-button { will-change: transform; }
      `}</style>
    </FlexSection>
  );
}

export default Home;
