import React, { useState, useRef } from "react";
import { send } from "emailjs-com";
import "./ErrorReportModal.scss";

const ErrorReportModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    from_name: "", // 사용자 이름 (필수 아님)
    from_email: "", // 사용자 이메일 (선택)
    message: "", // 오류 메시지
  });

  const overlayRef = useRef(null); // 모달 외부 감지를 위한 ref

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { from_name, from_email, message } = formData;

    try {
      await send(
        {
          from_name: from_name || "익명 사용자",
          from_email: from_email || "default@example.com",
          my_name: "솔비", // 고정
          message: message || "(내용 없음)",
          to_email: "solfany1999@gmail.com", // 고정
        },
        "VvQSChtbcKA2xvnoK" // Public Key
      );
      alert("오류 신고가 성공적으로 전송되었습니다.");
      setFormData({ from_name: "", from_email: "", message: "" });
      onClose();
    } catch (error) {
      console.error("오류 전송 실패:", error);
      alert("오류 전송에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="error-modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="error-modal">
        <div className="error-modal__header">
          <h2 className="error-modal__header-title">오류 신고</h2>
          <button className="error-modal__header-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="error-modal__content">
          <p className="dining-modal__description">
            오류나 개선이 필요한 점이 있다면 자유롭게 작성해 주세요.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="error-modal__input"
              name="from_name"
              placeholder="작성자 이름"
              value={formData.from_name}
              onChange={handleChange}
            />
            <input
              className="error-modal__input"
              name="from_email"
              placeholder="작성자 이메일 (선택)"
              value={formData.from_email}
              onChange={handleChange}
            />
            <textarea
              className="error-modal__input error-modal__textarea"
              name="message"
              placeholder="오류 내용을 입력하세요"
              value={formData.message}
              onChange={handleChange}
            />

            <div className="error-modal__button-group">
              <button type="submit">전송</button>
              <button type="button" onClick={onClose}>
                닫기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ErrorReportModal;
