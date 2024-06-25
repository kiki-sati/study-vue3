# [Vue 강의 끝판왕 : Nuxt 3 완벽 마스터 | 짐코딩 - 인프런](https://www.inflearn.com/course/vue-끝판왕-nuxt3-완벽마스터)
- 강의교안
   - [Vue 강의 끝판왕 : Nuxt 3 완벽 마스터 | 짐코딩 - 인프런](https://www.inflearn.com/course/vue-끝판왕-nuxt3-완벽마스터)
- 소스코드
  - [짐코딩 클럽 - 가장 쉬운 웹 개발 입문](https://www.gymcoding.co/)
  https://github.com/gymcoding/learn-nuxt-3


# 내용 정리
## 4-2 Nuxt Plugins & Utils
### plugins
- Nuxt는 자동으로 `plugins/` 디렉토리의 파일을 읽어와 Vue 애플리케이션 생성 시에 로드합니다.
- `plugins/` 디렉토리 내의 모든 플러그인은 자동으로 등록되며, 별도로 `nuxt.config`에 추가 할 필요가 없습니다.

### 등록된 플러그인
- 해당 디렉토리의 최상위 레벨에 있는 파일 또는 하위 디렉토리 내의 index 파일만 자동으로 플러그인으로 등록됩니다.
```html
-| plugins/
---| foo.ts      // 스캔 대상인 플러그인
---| bar/
-----| baz.ts    // 스캔되지 않는 플러그인
-----| foz.vue   // 스캔되지 않는 Vue 파일
-----| index.ts  // 현재는 스캔되고 있지만, 사용이 권장되지 않는(deprecated) 상태인 플러그인입니다.
``` 

### 플러그인 만들어서 쓰기

---

```jsx
// plugins/hello.ts
export default defineNuxtPlugin(nuxtApp => {
	// nuxtApp으로 어떤 작업을 할 수 있습니다.
})
```

### 객체 구문 플러그인 정의 가능

고급 사용 사례를 위해 객체 구문을 사용하여 플러그인을 정의하는 것도 가능합니다.

```jsx
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre', // 또는 'post'
  async setup(nuxtApp) {
    // 이 부분은 일반적인 함수형 플러그인의 동등한 부분입니다.
  },
  hooks: {
    // 여기에서 Nuxt 앱 런타임 훅을 직접 등록할 수 있습니다.
    'app:created'() {
      const nuxtApp = useNuxtApp()
      // 훅 내에서 작업 수행
    }
  },
  env: {
    // 이 값을 `false`로 설정하면 서버 전용 렌더링 또는 아일랜드 컴포넌트에서 플러그인을 실행하지 않습니다.
    islands: true
  }
})
```

위 코드는 Nuxt3에서 플러그인을 정의하는 방법을 나타냅니다.

1. **name**: 플러그인의 이름을 지정합니다. 이것은 플러그인을 식별하는 데 사용됩니다.
2. **enforce**: 플러그인이 언제 실행되어야 하는지를 나타냅니다. `pre`로 설정하면 프레임워크 내부에서 사용되는 플러그인보다 먼저 실행되고, `post`로 설정하면 나중에 실행됩니다.
3. **setup**: 플러그인의 메인 기능을 정의하는 부분입니다. 비동기 함수로서, Nuxt 애플리케이션을 초기화할 때 실행됩니다.
4. **hooks**: Nuxt 앱 런타임 훅을 직접 등록할 수 있습니다. 여기서는 `app:created` 훅을 사용하고 있으며, 앱이 생성될 때 실행됩니다.
5. **env**: 플러그인이 실행되는 환경을 제어하는데 사용됩니다. 예를 들어, `islands` 속성이 `true`로 설정되면 서버 전용 렌더링이나 아일랜드 컴포넌트에서만 플러그인이 실행됩니다.

이러한 플러그인 정의는 Nuxt3의 모듈 시스템과 함께 사용되어 효율적이고 모듈화된 코드를 작성할 수 있게 해줍니다.


```html
만약 객체 구문을 사용한다면, 속성들은 나중에 정적으로 분석되어 더 최적화된 빌드를 생성할 수 있습니다. 
그래서 런타임시 속성을 정의해서는 안 됩니다. 예를 들어, 
[ enforce: process.server ? 'pre' : 'post' ] 와 같이 설정하면 
Nuxt가 향후 플러그인에 대해 수행할 최적화를 방해할 수 있습니다.

```

### 등록 순서 설정
- 플러그인이 등록되는 순서를 제어하려면 파일 이름에 '알파벳 순'으로 번호를 붙이면 됩니다.
  ```html
  plugins/
   | - 01.myPlugin.ts
   | - 02.myOtherPlugin.ts
  ```

### 플러그인 로딩전략
- 기본적으로 Nuxt는 플러그인을 순차적으로 로드합니다.
- 플러그인을 병렬로 정의하여 Nuxt가 다음 플러그인을 로드하기 전에 플러그인 실행이 끝날 필요가 없도록 할 수 있습니다.
```javascript
export default defineNuxtPlugin({
  name: 'my-plugin',
  parallel: true,
  async setup(nuxtApp) {
    // 다음 플러그인은 즉시 실행될 것입니다.
  }
})
```

### Composables 사용
- Nuxt 플러그인 내에서는 composables와 utils를 모두 사용할 수 있습니다.
```javascript
// plugins/hello.ts
export default defineNuxtPlugin((nuxtApp) => {
  const foo = useFoo()
})
```
- 제한 사항과 차이점
  - 특정 컴포저블이 나중에 등록된 다른 플러그인에 의존하는 경우 - 작동 불가
    - 플러그인은 순차적으로 순서대로 호출되며 모든 것보다 먼저 호출됩니다.
    - 특정 컴포저블이 다른 플러그인에 의존하는데 해당 플러그인이 아직 호출되지 않았다면 문제가 발생할 수 있습니다.
  - 특정 컴포저블이 Vue.js 라이프사이클에 의존하는 경우 - 작동 불가
    - 일반적으로 Vue.js의 컴포저블은 현재 컴포넌트 인스턴스에 바인딩되는 반면, 플러그인은 오직 nuxtApp 인스턴스에만 바인딩되기 때문에 동작하지 않을 수 있다.

### 외부 라이브러리 Autoimport
-  외부 라이브러리는 autoimport 지원을 안합니다. 그래서 nuxt.config.ts에 설정 해주면 가능합니다. (vue-i18n 적용 예시)

```javascript
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n'],
      },
    ],
  },
```
```javascript
const {locale} = useI18n();
const selectedLanguageName =
  computed(() => languages.value.find((lang) => lang.code == locale.value)?.name,
  );
```

### utils

> `utils/` 디렉토리를 사용하여 애플리케이션 전체에서 유틸리티 함수를 자동으로 가져올 수 있습니다.

---

[**`utils/` 디렉터리**](https://nuxt.com/docs/guide/directory-structure/utils)의 주요 목적은 Vue composables와 다른 자동으로 가져온 유틸리티 함수 간의 의미론적 구분을 허용하는 것입니다.

### 사용법

---

**방법 1:** **named export** 사용

```jsx
// utils/index.ts
export const { format: formatNumber } = Intl.NumberFormat('en-GB', {
	notation: 'compact',
	maximumFractionDigits: 1
});
```

**방법 2: default export** 사용

```jsx
// utils/random-entry.ts 또는 utils/randomEntry.ts
// randomEntry()로 사용 가능합니다.
export default function (arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)]
}
```

이제 `.js`, `.ts` 및 `.vue` 파일에서 자동으로 가져온 유틸리티 함수를 사용할 수 있습니다.

**사용예시**

```html
// app.vue
<template>
  <p>{{ formatNumber(1234) }}</p>
</template>
```

💡 [Read more in **Docs > Guide > Concepts > Auto Imports**.](https://nuxt.com/docs/guide/concepts/auto-imports)

💡 Read and edit a live example in [**Docs > Examples > Features > Auto Imports**](https://nuxt.com/docs/examples/features/auto-imports).

💡 `utils/` 디렉토리의 자동 가져오기 작업과 검색 방식은 `composables/` 디렉토리와 동일합니다.

⚠️ 이러한 유틸리티 함수는 앱의 Vue 부분 내에서만 사용할 수 있습니다. `server/` 디렉토리에서는 오직 `server/utils`가 자동으로 가져와집니다.

## Auto-imports
- Nuxt는 컴포넌트, 컴포저블 그리고 Vue.js API를 자동으로 가져와서 명시적으로 import하지 않고도 애플리케이션 전체에서 사용할 수 있도록 합니다.
```javascript
// app.vue
<script setup lang="ts">
const count = ref(1) // ref is auto-imported
</script>
```

- 독창적인 디렉터리 구조 덕분에 Nuxt는 components/, composables/ 및 utils/ 디렉터리의 리소스를 자동으로 가져올 수 있습니다.
- 전역 선언과 달리 Nuxt는 입력, 빌드 시 실제 사용하는 코드만 import 할 수 있도록 지원합니다.
- `nuxt.config` 파일의 `imports` 섹션을 구성하여 사용자 정의 폴더 또는 타사 패키지에서 내보낸 기능을 자동으로 가져올 수도 있습니다.



![img_1.png](img_1.png)
- 개발자도구에서 확인된 소싀. 아래 사진과 같이 자동 import 된걸 확인 할 수 있다. 
![img_2.png](img_2.png)

### [**Auto-imports 비활성화**](https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports)

- 컴포저블 및 유틸리티 자동 가져오기를 사용 중지하려면 `nuxt.config` 파일에서 `imports.autoImport`를 `false`로 설정하면 됩니다.
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  components: {
    dirs: []
  }
})
```

## [**third-party 패키지 Auto-import**](https://nuxt.com/docs/guide/concepts/auto-imports#auto-import-from-third-party-packages)

- Nuxt는 타사(third-party) 패키지에서 Auto-import를 허용합니다.
- 예를 들어 다음과 같이 vue-i18n 패키지에서 useI18n 컴포저블 함수를 Auto-import 사용 설정할 수 있습니다.
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
  }
})
```
