# 🍽️ React Firebase Menu Picker

**React 기반 점심 메뉴 투표 시스템**입니다.

Firebase를 이용한 **실시간 데이터 저장, 투표 통계, 외식 관리자 설정**, **오류 신고 기능** 등을 포함하며,

더미 모드로 간단한 Firebase 설정 후 UI 테스트가 가능합니다.

---

## 🚀 프로젝트 소개

- 부서별 유저들이 **매일 점심 메뉴를 투표**할 수 있습니다.
- **외식 여부 및 식당을 관리자(또는 운영자)가 직접 지정**할 수 있습니다.
- Firebase Realtime Database를 기반으로 한 **실시간 투표 및 통계 기능**이 제공됩니다.
- **오류 신고 기능**과 초기 JSON 데이터 구성 기능 포함.

---

## 🧩 주요 기능 요약

- ✅ 점심 메뉴 투표 기능 (다중 선택 가능)
- 📊 메뉴별 득표 수 및 부서별 통계 시각화
- 🧑‍💼 외식 관리자 UI (모드 수동 설정 및 식당 선택)
- 📨 오류 신고 기능 (EmailJS 기반 전송)
- 🔄 Firebase 없이 실행 가능한 더미(Mock) 모드

---

## 🛠 브랜치 전략

- `main`: 운영용 릴리즈 반영 브랜치
- `develop`: 테스트 및 통합 기능 브랜치
- `release/*`: 배포를 위한 릴리즈 태그 브랜치 (`release/v1.0.1` 등)
- `feature/*`: 기능 단위 개발 브랜치 (`feature/error-report` 등)

---

## 📦 프로젝트 설치

1. 레포지토리 클론
    
    `git clone https://github.com/solfany/react-firebase-menu-picker.git`
    
2. 패키지 설치
    
    `npm install`
    
3. 실행
    
    `npm start`
    

---

## ⚙️ 로컬 초기 설정 가이드

**Git에 포함되지 않는 로컬 설정 파일**들을 직접 구성해야 합니다.

### 필수 디렉토리: `src/data/`

| 파일명 | 용도 |
| --- | --- |
| `externalMenu.json` | 외식 식당 목록 |
| `menus.json` | 날짜별 점심 메뉴 |
| `users.json` | 유저 이름 및 부서 |
| `voteTime.json` | 투표 가능 시간 (`start`, `end`) |

➡️ JSON 구조 및 샘플은 [로컬 개발용 JSON 및 설정 파일 가이드](https://github.com/solfany/react-firebase-menu-picker/wiki/%EB%A1%9C%EC%BB%AC-%EA%B0%9C%EB%B0%9C%EC%9A%A9-JSON-%EB%B0%8F-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C) 참고

---

### Firebase 설정 파일: `src/firebase/firebase.js`

- 실제 Firebase 연결을 하거나, 더미(mock) 설정을 선택할 수 있습니다.

예시 – 더미 설정용

```jsx
export const database = {};
export const ref = () => ({
  on: () => {},
  set: () => {},
  once: () => Promise.resolve({ val: () => null })
});
```

> 운영 시에는 .env에서 REACT_APP_USE_MOCK=false로 설정하고 실제 Firebase config 입력
> 

---

## 📨 오류 신고 기능 (EmailJS)

EmailJS를 통해 오류/의견을 개발자에게 이메일로 전송합니다.

- 입력 항목: 이름, 이메일(선택), 메시지
- 의존 패키지: `emailjs-com`
- 위치: `src/components/modal/ErrorReportModal.jsx`

설정 필요:

- EmailJS 서비스 ID
- 템플릿 ID
- 공개 API 키

➡️ [오류 신고 기능 가이드 보기](https://github.com/solfany/react-firebase-menu-picker/wiki/%EB%A1%9C%EC%BB%AC-%EA%B0%9C%EB%B0%9C%EC%9A%A9-JSON-%EB%B0%8F-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C#%F0%9F%93%A8-%EC%98%A4%EB%A5%98-%EC%8B%A0%EA%B3%A0-%EA%B8%B0%EB%8A%A5-emailjs-)

---

## 🧪 로컬 개발용 더미 데이터

Firebase 없이도 전체 UI 기능을 테스트할 수 있도록

더미 JSON 데이터를 사용한 개발이 가능합니다.

➡️ [로컬 개발용 JSON 더미 데이터 보기](https://github.com/solfany/react-firebase-menu-picker/wiki/%EB%A1%9C%EC%BB%AC-%EA%B0%9C%EB%B0%9C%EC%9A%A9-JSON-%EB%8D%94%EB%AF%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0)

---

## 📌 최신 릴리즈 요약 – `v1.0.1 (2025년 5월 3주차)`

- EmailJS 기반 오류 신고 모달 추가
- Firebase 설정 mock 처리 및 분기 구조 적용
- 위키 문서 정비 및 JSON 샘플 가이드 추가

브랜치: `release/v1.0.1`

➡️ [Releases 전체 보기](https://github.com/solfany/react-firebase-menu-picker/releases)

---

## 🙌 기여 가이드

1. 이슈 생성 또는 확인
2. `feature/*` 브랜치 생성 후 기능 개발
3. `develop` 브랜치로 PR 요청
4. 리뷰 후 `main` 또는 `release/*` 병합

---

## 📄 라이선스

MIT License

© 2025 [solfany](https://github.com/solfany)
