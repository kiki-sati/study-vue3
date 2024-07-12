## 기술 스텍
### [Nuxt UI](https://ui.nuxt.com/?utm_source=nuxt_website&utm_medium=modules) : Tailwind CSS and Headless UI 기반

### sidebase/nuxt-auth
- authjs-provider 의 특징은 다음과 nuxt-auth같습니다.
- ✔️ 인증 제공자:
  - ✔️ OAuth (예: Github, Google, Twitter, Azure, ...)
  - ✔️ 사용자 정의 OAuth(직접 작성)
  - ✔️ 자격 증명(비밀번호 + 사용자 이름)
  - ✔️ 이메일 매직 URL
- ✔️ 동형 / 범용 인증 구성 가능 useAuth지원:
  - 작업: getSession, getCsrfToken, getProviders, signIn,signOut
  - 게터: status, data,lastRefreshedAt
  - 모든 메서드 및 속성에 대한 전체 타입스크립트 지원
- ✔️ 애플리케이션 측 미들웨어 보호
- ✔️ 서버 측 미들웨어 및 엔드포인트 보호
- ✔️ 세션 수명 주기 관리를 위한 고급 기능:
  - 세션을 주기적으로 새로 고침합니다
  - 탭 재포커스 시 세션 새로 고침
  - 페이지 로드 시 한 번 세션을 가져오고 그 후 특정 작업(예: 탐색 시)을 위해 가져옵니다.
  - 🚧 탭 간 세션 브로드캐스팅(70번 참조)
- ✔️ 요청 전반에 걸친 지속적인 세션
- ✔️ REST API:
  - GET /signin,
  - POST /signin/:provider,
  - GET/POST /callback/:provider,
  - GET /signout,
  - POST /signout,
  - GET /session,
  - GET /csrf,
  - GET /providers
- v0.6으로 시작하는 모든 기능 표는 nuxt-auth "next"-version-docs 에서 찾을 수 있습니다 . 

### nuxt-server-utils : Mongoose로 Nuxt.js API

### mongoose