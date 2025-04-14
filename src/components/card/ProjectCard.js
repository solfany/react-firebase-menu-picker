import React from 'react';
import '../../../styles/components/card/_ProjectCard.scss';
import { useEffect, useState } from 'react';
const ProjectCard = ({
    title,
    subtitle,
    content,
    imageUrl,
    className = '',
    showSearch = false,
    onSearch,
    footer
  }) => {
    const [visitorCount, setVisitorCount] = useState(null);
  
    useEffect(() => {
      const today = new Date().toISOString().split("T")[0];
      const key = `visitor-count-${today}`;
      const stored = localStorage.getItem(key);
  
      if (!stored) {
        const count = Math.floor(Math.random() * 1000) + 1;
        localStorage.setItem(key, count);
        setVisitorCount(count);
      } else {
        setVisitorCount(parseInt(stored, 10));
      }
    }, []);
  
    const handleScrollToNextSection = () => {
      const nextSection = document.getElementById("next-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    return (
      <div className={`card project-card ${className}`}>
        {imageUrl && (
          <div
            className="card__image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        <div className="card__body">
          <div className="card__center-title">
            {title && <h2 className="card__title">{title}</h2>}
            <p className="project-card__description">
              다양한 아이디어와 기술로 직접 만든 프로젝트를 소개합니다.
            </p>
  
            {showSearch && (
              <>
                <input
                  type="text"
                  placeholder="프로젝트 검색..."
                  className="project-card__search"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
                <button className="project-card__scroll-button" onClick={handleScrollToNextSection}>
                  하단으로 이동
                </button>
              </>
            )}
          </div>
  
          <div className="card__bottom-content">
            {subtitle && <div className="card__subtitle">{subtitle}</div>}
            {content && <div className="card__content">{content}</div>}
          </div>
  
          {footer && <div className="card__footer">{footer}</div>}
        </div>
      </div>
    );
  };
export default ProjectCard;  