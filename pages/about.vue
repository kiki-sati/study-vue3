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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>
