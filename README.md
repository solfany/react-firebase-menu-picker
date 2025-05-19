## 초기 설정 가이드

이 프로젝트는 **일부 로컬 전용 설정 파일 및 데이터 파일**을 필요로 합니다.  
보안 및 환경 의존성 문제로 인해 이 파일들은 Git에 포함되어 있지 않으며, **각 개발자의 로컬 환경에서 직접 생성**해야 합니다.

---

### 📁 필수 로컬 파일 및 디렉토리

#### 1. `src/data/` 디렉토리

이 디렉토리에는 점심 메뉴 투표 기능을 위한 **기초 데이터 JSON 파일**들이 포함되어야 합니다.

| 파일명              | 설명                                   |
|---------------------|----------------------------------------|
| `externalMenu.json` | 외식 식당 목록 정의 (외식/사내 구분용) |
| `menus.json`        | 날짜별 점심 메뉴 구성                  |
| `users.json`        | 사용자 이름 및 소속 부서 목록          |
| `voteTime.json`     | 투표 가능 시간 설정 (`start`, `end`)   |

> 각 파일의 데이터 구조 및 예시는 [로컬 개발용 JSON 및 설정 파일 가이드](https://github.com/solfany/react-firebase-menu-picker/wiki/로컬-개발용-JSON-및-설정-파일-가이드)를 참고해 주세요.  
> 테스트용 더미 데이터는 [로컬 개발용 JSON 더미 데이터](https://github.com/solfany/react-firebase-menu-picker/wiki/로컬-개발용-JSON-더미-데이터)를 참고해 주세요.  

---

#### 2. `src/firebase/firebase.js`

이 파일은 Firebase Realtime Database 연결 설정을 위한 구성 파일입니다.  
**Git에 포함되지 않으며**, 아래와 같은 형식으로 **로컬에서 직접 생성**해 주세요:

```js
// src/firebase/firebase.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg"
};

export default firebaseConfig;
```


### 주의사항  
위 파일들이 없으면 앱이 정상적으로 실행되지 않거나, 일부 기능(예: 투표, 통계 등)이 정상 동작하지 않을 수 있습니다.

위 정보는 Firebase 콘솔에서 직접 발급받을 수 있으며, 팀 프로젝트에 따라 값이 달라질 수 있습니다.

해당 파일들은 .gitignore에 의해 Git 추적에서 제외되어 있으므로, 절대 커밋하지 않도록 주의해 주세요.
