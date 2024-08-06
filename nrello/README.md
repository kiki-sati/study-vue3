## 기술 스텍
### [Nuxt UI](https://ui.nuxt.com/?utm_source=nuxt_website&utm_medium=modules) : Tailwind CSS and Headless UI 기반
#### sidebase/nuxt-auth, nuxt-server-utils : Mongoose로 Nuxt.js API

### ERD
#### **User**

| 필드             | 타입    | 설명                       |
|------------------|---------|----------------------------|
| `_id`            | ObjectId| 기본 키 (Primary Key)      |
| `name`           | String  | 사용자 이름                |
| `email`          | String  | 이메일 (Unique)            |
| `password`       | String  | 비밀번호                   |
| `stripeCustomerId` | String | Stripe 고객 ID (Optional)  |
| `timestamps`     | Timestamp | 생성 및 수정 시각          |

#### **Board**

| 필드             | 타입                 | 설명                              |
|------------------|----------------------|-----------------------------------|
| `_id`            | ObjectId             | 기본 키 (Primary Key)             |
| `name`           | String               | 보드 이름                         |
| `lists`          | Array<ObjectId>      | 참조: `List` 컬렉션의 ObjectId 배열 |
| `owner`          | ObjectId             | 참조: `User` 컬렉션의 ObjectId     |
| `coverImage`     | String               | 커버 이미지 (Optional)            |
| `timestamps`     | Timestamp            | 생성 및 수정 시각                 |

#### **List**

| 필드             | 타입                 | 설명                              |
|------------------|----------------------|-----------------------------------|
| `_id`            | ObjectId             | 기본 키 (Primary Key)             |
| `name`           | String               | 리스트 이름                       |
| `cards`          | Array<ObjectId>      | 참조: `Card` 컬렉션의 ObjectId 배열 |
| `board`          | ObjectId             | 참조: `Board` 컬렉션의 ObjectId    |
| `owner`          | ObjectId             | 참조: `User` 컬렉션의 ObjectId     |
| `timestamps`     | Timestamp            | 생성 및 수정 시각                 |

#### **Card**

| 필드             | 타입                 | 설명                              |
|------------------|----------------------|-----------------------------------|
| `_id`            | ObjectId             | 기본 키 (Primary Key)             |
| `title`          | String               | 카드 제목                         |
| `description`    | String               | 카드 설명 (Optional)              |
| `owner`          | ObjectId             | 참조: `User` 컬렉션의 ObjectId     |
| `list`           | ObjectId             | 참조: `List` 컬렉션의 ObjectId     |
| `timestamps`     | Timestamp            | 생성 및 수정 시각                 |

### 관계

- **Board**:
  - `lists`: `Array<ObjectId>`로 `List` 컬렉션을 참조.
  - `owner`: `ObjectId`로 `User` 컬렉션을 참조.

- **List**:
  - `cards`: `Array<ObjectId>`로 `Card` 컬렉션을 참조.
  - `board`: `ObjectId`로 `Board` 컬렉션을 참조.
  - `owner`: `ObjectId`로 `User` 컬렉션을 참조.

- **Card**:
  - `owner`: `ObjectId`로 `User` 컬렉션을 참조.
  - `list`: `ObjectId`로 `List` 컬렉션을 참조.


## 사용 핵심 기술
## Vue 3 Teleport
- HTML 요소를 지정한 위치로 이동시키는 컴포넌트
- 주로 모달, 툴팁, 드롭다운 메뉴와 같은 UI 요소를 특정 위치에 렌더링할 때 유용
### 주요 기능
- **요소를 원하는 위치에 렌더링**: 요소를 특정 부모나 `body` 등 원하는 곳에 이동시켜 렌더링.
- **레이아웃에 영향 없음**: 요소를 이동시켜도 기존 레이아웃에 영향을 주지 않음.

### 참고 자료
- [Vue.js 공식 문서 - Teleport](https://vuejs.org/guide/built-ins/teleport.html)
- [공식 vue3 teleport api ](https://vuejs.org/api/built-in-components.html#teleport)
