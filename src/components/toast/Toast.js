// src/components/toast/Toast.jsx
import React, { useEffect } from 'react';
import './Toast.scss';

const Toast = ({ message = '', visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3초 뒤 자동 사라짐
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  // 개발환경에서 항상 표시 (디버깅용)
  const shouldRender = process.env.NODE_ENV === 'development' || visible;
  if (!shouldRender) return null;

  return (
    <div className="toast-notification">
      <div className="toast-message">{message || '개발자 테스트용 메시지입니다.'}</div>
    </div>
  );
};

export default Toast;
