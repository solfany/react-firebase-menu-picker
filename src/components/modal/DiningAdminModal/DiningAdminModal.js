import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/_diningAdminModal.scss';
import Title from '../../../components/title/DefaultTitle/DefaultTitle';
import Text from '../../../components/text/DefaultText/DefaultText';
import { FiX, FiUser, FiLock, FiLogIn, FiCheckCircle } from 'react-icons/fi';
import { database } from '../../../firebase/firebase';
import { ref, set, onValue } from 'firebase/database';

const STORAGE_KEY = 'diningAdminLoggedIn';

const DiningAdminModal = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [isExternalEnabled, setIsExternalEnabled] = useState(false);

  const overlayRef = useRef(null);
  const logoutTimerRef = useRef(null);

  // 모달 열릴 때 localStorage 체크 + 외식 모드 불러오기
  useEffect(() => {
    if (isOpen) {
      const loggedIn = localStorage.getItem(STORAGE_KEY) === 'true';
      setIsLoggedIn(loggedIn);

      const externalModeRef = ref(database, 'settings/externalMode');
      onValue(externalModeRef, (snapshot) => {
        const value = snapshot.val();
        if (typeof value === 'boolean') {
          setIsExternalEnabled(value);
        }
      });
    }
  }, [isOpen]);

  // 로그인
  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.id === 'admin' && credentials.password === '1234') {
      setIsLoggedIn(true);
      setError('');
      localStorage.setItem(STORAGE_KEY, 'true');

      // 1시간 후 강제 로그아웃 타이머 설정
      logoutTimerRef.current = setTimeout(() => {
        handleLogout();
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      }, 3600 * 1000);
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 외식 모드 토글
  const handleToggleExternal = async () => {
    const newStatus = !isExternalEnabled;
    setIsExternalEnabled(newStatus);
    try {
      await set(ref(database, 'settings/externalMode'), newStatus);
    } catch (error) {
      console.error('외식 모드 업데이트 실패:', error);
    }
  };

  // 로그아웃
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ id: '', password: '' });
    localStorage.removeItem(STORAGE_KEY);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  };

  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dining-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="dining-modal">
        <div className="dining-modal__header">
          <Title variant="secondary" className="dining-modal__title">
            {isLoggedIn ? '외식 모드 관리' : '관리자 로그인'}
          </Title>
          <button className="dining-modal__close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="dining-modal__content">
          {!isLoggedIn ? (
            <div className="dining-modal__login">
              <div className="dining-modal__logo">
                <div className="dining-modal__logo-icon">
                  <FiLogIn size={28} />
                </div>
              </div>
              <form onSubmit={handleLogin} className="dining-modal__login-form">
                <div className="dining-modal__form-group">
                  <label className="dining-modal__label">아이디</label>
                  <div className="dining-modal__input-wrapper">
                    <FiUser className="dining-modal__input-icon" /> 
                    <input
                      type="text"
                      className="dining-modal__input"
                      value={credentials.id}
                      onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                      placeholder="아이디 입력"
                    />
                  </div>
                </div>
                <div className="dining-modal__form-group">
                  <label className="dining-modal__label">비밀번호</label>
                  <div className="dining-modal__input-wrapper">
                    <FiLock className="dining-modal__input-icon" />
                    <input
                      type="password"
                      className="dining-modal__input"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      placeholder="비밀번호 입력"
                    />
                  </div>
                </div>
                {error && <p className="dining-modal__error">{error}</p>}
                <button type="submit" className="dining-modal__submit-button">로그인</button>
              </form>
            </div>
          ) : (
            <div className="dining-modal__settings">
              <div className="dining-modal__login-status">
                <FiCheckCircle size={28}/>
                <Text className="dining-modal__login-status-text">관리자 로그인 중입니다</Text>
              </div>

              <Text className="dining-modal__description">
                외식 모드를 활성화하면 전체 사원에게 외식 모드 공지가 생성됩니다.
              </Text>

              <div className="dining-modal__toggle-container">
                <div className="dining-modal__toggle-info">
                  <Text className="dining-modal__toggle-label">외식 모드</Text>
                  <Text className={`dining-modal__status ${isExternalEnabled ? 'dining-modal__status--enabled' : 'dining-modal__status--disabled'}`}>
                    {isExternalEnabled ? '활성화됨' : '비활성화됨'}
                  </Text>
                </div>
                <label className="dining-modal__toggle">
                  <input type="checkbox" checked={isExternalEnabled} onChange={handleToggleExternal} />
                  <span className="dining-modal__toggle-slider"></span>
                </label>
              </div>

              <button 
                className="dining-modal__logout-button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiningAdminModal;
