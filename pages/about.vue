<template>
  <q-page padding>
    <div class="q-my-xl text-center">
      <PageTitle title="About" />
      <PageDescription
        description="Vue & Nuxt Mastery Class 웹은 Nuxt3로 만들어졌습니다."
      />

      <div class="column">
        <RouterLink to="/">RouterLink home</RouterLink>
        <RouterLink to="https://youtube.com/@gymcoding">유튜브</RouterLink>
        <br />
        <NuxtLink to="/">NuxtLink home</NuxtLink>
        <NuxtLink to="https://youtube.com/@gymcoding">NuxtLink 유튜브</NuxtLink>
        <div class="q-gutter-y-sm q-mt-md">
          <div class="text-subtitle1 text-weight-bold">useState('counter')</div>
          <div>
            counter: {{ counter }}
            <q-btn
              label="counter"
              color="primary"
              dense
              no-caps
              @click="counter++"
            />
          </div>
          <div>
            sameCounter: {{ sameCounter }}
            <q-btn
              label="counter"
              color="primary"
              dense
              no-caps
              @click="sameCounter++"
            />
          </div>
          <div>
            <q-btn label="counter" @click="clearNuxtState()" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// 파라미터1 : 공유할 상태의 키
// 파라미터2 : 초기 값
const counter = useState<number>('counter', () => 1);
const sameCounter = useState<number>('counter');
</script>
