<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title> Vue & Nuxt Mastery Class</q-toolbar-title>
        <NuxtLink v-slot="{ navigate }" custom to="/">
          <q-btn stretch flat :label="$t('home')" no-caps @click="navigate" />
        </NuxtLink>

        <q-separator dark vertical />
        <NuxtLink v-slot="{ navigate }" custom to="/about">
          <q-btn stretch flat :label="$t('about')" no-caps @click="navigate" />
        </NuxtLink>
        <q-separator dark vertical />
        <q-btn
          stretch
          flat
          :label="$t('youtube')"
          no-caps
          @click="moveYoutube"
        />
        <q-separator dark vertical />
        <NuxtLink v-slot="{ navigate }" custom to="/admin">
          <q-btn stretch flat :label="$t('admin')" no-caps @click="navigate" />
        </NuxtLink>
      </q-toolbar>
    </q-header>
    <q-page-container :style="pageContainerStyle">
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
const pageContainerStyle = computed(() => ({
  maxWidth: '1080px',
  margin: '0 auto',
}));

const moveYoutube = async () => {
  await navigateTo('https://www.youtube.com/', {
    external: true,
    open: { target: '_blank' },
  });
};

interface Language {
  name: string;
  code: 'en' | 'ko';
}

const languages = ref<Language[]>([
  { name: 'English', code: 'en' },
  { name: '한국어', code: 'ko' },
]);
</script>
