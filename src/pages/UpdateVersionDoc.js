import { useState } from "react";
import styles from "./UpdateVersionDoc.module.scss";
import versionDataJson from "../data/versionData.json";

const ITEMS_PER_PAGE = 5;

const UpdateVersionDoc = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState(new Set([0])); // 첫 번째 항목은 기본 확장
  const [viewMode, setViewMode] = useState("accordion"); // accordion, list, pagination

  const versionHistory = versionDataJson.versionHistory || [];

  const sortedVersions = versionHistory.slice().sort((a, b) => {
    if (sortOrder === "latest") return b.date.localeCompare(a.date);
    if (sortOrder === "oldest") return a.date.localeCompare(b.date);
    if (sortOrder === "version") return b.version.localeCompare(a.version);
    return 0;
  });

  const filteredVersions = sortedVersions.filter((item) =>
    item.updates.some((update) =>
      update.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredVersions.length / ITEMS_PER_PAGE);
  
  // 페이지네이션 로직 수정
  const displayVersions = viewMode === "pagination" 
    ? filteredVersions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filteredVersions;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setExpandedItems(new Set()); // 페이지 변경시 확장 상태 초기화
    }
  };

  const toggleExpand = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(displayVersions.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  // 뷰 모드 변경시 페이지 초기화
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setExpandedItems(mode === "accordion" ? new Set([0]) : new Set());
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center'
  };

  const viewModeSelectorStyles = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center'
  };

  const viewModeButtonStyles = (isActive) => ({
    padding: '10px 20px',
    border: '2px solid #007bff',
    backgroundColor: isActive ? '#007bff' : 'white',
    color: isActive ? 'white' : '#007bff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  });

  const controlPanelStyles = {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const selectStyles = {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const inputStyles = {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minWidth: '200px'
  };

  const expandControlsStyles = {
    display: 'flex',
    gap: '10px'
  };

  const expandBtnStyles = {
    padding: '6px 12px',
    border: '1px solid #28a745',
    backgroundColor: 'white',
    color: '#28a745',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  };

  const versionCardStyles = (isLatest, isAccordion) => ({
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '15px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ...(isLatest && { borderColor: '#28a745', boxShadow: '0 2px 8px rgba(40,167,69,0.2)' }),
    ...(isAccordion && { cursor: 'pointer' })
  });

  const versionHeaderStyles = (isClickable) => ({
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    ...(isClickable && { cursor: 'pointer' })
  });

  const versionTitleGroupStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const versionTitleStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333'
  };

  const newBadgeStyles = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  const updateCountStyles = {
    color: '#666',
    fontSize: '14px'
  };

  const headerRightStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const versionDateStyles = {
    color: '#666',
    fontSize: '14px'
  };

  const expandIconStyles = (isExpanded) => ({
    transition: 'transform 0.2s',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    fontSize: '12px',
    color: '#666'
  });

  const updateContentStyles = {
    padding: '20px'
  };

  const updateListStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const updateItemStyles = {
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
    position: 'relative',
    paddingLeft: '20px'
  };

  const noDataStyles = {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '16px'
  };

  const paginationStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '30px'
  };

  const paginationButtonStyles = (isActive, isDisabled) => ({
    padding: '8px 12px',
    border: '1px solid #ddd',
    backgroundColor: isActive ? '#007bff' : (isDisabled ? '#f8f9fa' : 'white'),
    color: isActive ? 'white' : (isDisabled ? '#6c757d' : '#007bff'),
    borderRadius: '4px',
    cursor: isDisabled ? 'default' : 'pointer',
    fontSize: '14px'
  });

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>버전 업데이트 내역</h1>

      {/* 뷰 모드 선택 */}
      <div style={viewModeSelectorStyles}>
        <button 
          style={viewModeButtonStyles(viewMode === "accordion")}
          onClick={() => handleViewModeChange("accordion")}
        >
          📋 아코디언
        </button>
        <button 
          style={viewModeButtonStyles(viewMode === "list")}
          onClick={() => handleViewModeChange("list")}
        >
          📄 전체 리스트
        </button>
        <button 
          style={viewModeButtonStyles(viewMode === "pagination")}
          onClick={() => handleViewModeChange("pagination")}
        >
          📑 페이지네이션
        </button>
      </div>

      {/* 컨트롤 패널 */}
      <div style={controlPanelStyles}>
        <select
          style={selectStyles}
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="version">버전순</option>
        </select>
        <input
          style={inputStyles}
          type="text"
          placeholder="업데이트 내용 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        
        {viewMode === "accordion" && (
          <div style={expandControlsStyles}>
            <button onClick={expandAll} style={expandBtnStyles}>모두 펼치기</button>
            <button onClick={collapseAll} style={expandBtnStyles}>모두 접기</button>
          </div>
        )}
      </div>

      {/* 결과 컨테이너 */}
      <div>
        {displayVersions.length > 0 ? (
          displayVersions.map((item, index) => {
            const isExpanded = expandedItems.has(index);
            const isLatest = index === 0 && sortOrder === "latest";
            
            return (
              <div
                key={`${item.version}-${index}`}
                style={versionCardStyles(isLatest, viewMode === "accordion")}
              >
                <div 
                  style={versionHeaderStyles(viewMode === "accordion")}
                  onClick={viewMode === "accordion" ? () => toggleExpand(index) : undefined}
                >
                  <div style={versionTitleGroupStyles}>
                    <h2 style={versionTitleStyles}>{item.version}</h2>
                    {isLatest && <span style={newBadgeStyles}>NEW</span>}
                    <span style={updateCountStyles}>({item.updates.length}개 업데이트)</span>
                  </div>
                  <div style={headerRightStyles}>
                    <span style={versionDateStyles}>{item.date}</span>
                    {viewMode === "accordion" && (
                      <span style={expandIconStyles(isExpanded)}>
                        ▼
                      </span>
                    )}
                  </div>
                </div>

                {(viewMode !== "accordion" || isExpanded) && (
                  <div style={updateContentStyles}>
                    <ul style={updateListStyles}>
                      {item.updates.map((update, idx) => (
                        <li key={idx} style={updateItemStyles}>
                          • {update}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div style={noDataStyles}>일치하는 업데이트가 없습니다.</div>
        )}
      </div>

      {/* 페이지네이션 (페이지네이션 모드일 때만) */}
      {viewMode === "pagination" && totalPages > 1 && (
        <div style={paginationStyles}>
          <button
            style={paginationButtonStyles(false, currentPage === 1)}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              style={paginationButtonStyles(currentPage === i + 1, false)}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            style={paginationButtonStyles(false, currentPage === totalPages)}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateVersionDoc;