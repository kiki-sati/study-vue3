<template>
  <div>
    <AppCard>
      <template #header>
        <div class="text-h5 text-weight-medium">{{ course?.title }}</div>
        <div class="flex q-gutter-x-sm items-center q-mt-sm text-grey-8">
          <span class="flex items-center">
            <q-icon name="star" size="16px" color="orange" />
            <span>{{ course?.rating }}</span>
          </span>
          <span> {{ course?.rating }}개의 수강평 </span>
          <span>&middot;</span>
          <span>{{ course?.rating }}명의 수강생</span>
          <q-space />
          <a class="text-bold" :href="course?.reviewsUrl" target="_blank">
            수강평 보기
          </a>
        </div>
      </template>
      <div class="q-mb-md">
        <VideoPlayer :src="course?.video" />
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            label="인프런에서 수강하기"
            unelevated
            class="full-width"
            color="primary"
            :href="course?.inflearnUrl"
            target="_blank"
          />
        </div>
        <div class="col-6">
          <q-btn
            label="짐코딩 클럽에서 수강하기"
            unelevated
            class="full-width"
            color="red"
            :href="course?.gymcodingUrl"
            target="_blank"
          />
        </div>
      </div>
      <p class="q-mt-lg text-grey-8">
        {{ course?.content }}
      </p>
      <q-separator class="q-mb-lg" />
      <q-form class="q-gutter-y-md">
        <q-btn
          label="수강완료"
          class="full-width"
          color="green"
          unelevated
          :outline="!completed"
          :icon="completed ? 'check' : undefined"
          @click="toggleComplete"
        />
        <q-input
          v-model="memo"
          type="textarea"
          outlined
          dense
          placeholder="메모를 작성해주세요."
          rows="3"
          autogrow
        />
      </q-form>
      <template #footer>
        <client-only>
          <q-btn
            v-if="prevCourse"
            label="이전 강의"
            color="primary"
            unelevated
            @click="movePage(prevCourse.path)"
          />
          <q-btn
            label="쿼리추가"
            color="dark"
            unelevated
            :to="{ path: $route.path, query: { timestamp: Date.now() } }"
          />
          <q-space />
          <q-btn
            v-if="nextCourse"
            label="다음 강의"
            color="primary"
            unelevated
            @click="movePage(nextCourse.path)"
          />
        </client-only>
      </template>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { useCourse } from '~/composables/useCourse';

const route = useRoute();
const courseSlug = route.params.courseSlug as string;
const { course, prevCourse, nextCourse } = useCourse(courseSlug);

// setup 함수 안에 있기 때문에 뷰가 렌더링 되는 시점에 검사함
// if (!course) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Course not found',
//     // fatal: true,
//   });
// }

console.log('[courseSlug].vue 컴포넌트 setup hooks');

// 해당 함수는 컴파일이 완료된 시점에 setup 함수안에 존재하지 않는다.
// 전역 네임스페이스에 있다.
definePageMeta({
  // definePageMeta 는 밖에 있는 함수로 컴포넌트를 참조할 수 없음.
  key: (route) => route.fullPath,
  title: 'My home page',
  pageType: '',
  // keepalive: true, // 상태 유지(캐싱)
  alias: ['/lecture/:courseSlug'],
  // 외부에 존재하기 때문에 컴포넌트가 렌더링 되기 전에 체크함
  validate: (route) => {
    const courseSlug = route.params.courseSlug as string;
    const { course } = useCourse(courseSlug);
    if (!course) {
      // return false;
      throw createError({
        statusCode: 404,
        statusMessage: 'Course not found',
        // fatal: true,
      });
    }
    return true;
  },
});

const memo = ref('');
const completed = ref(false);

const movePage = async (path: string) => {
  await navigateTo(path);
};

const toggleComplete = () => {
  // $fetch('/api/error');
  // showError('에러가 발생했습니다.');
  completed.value = !completed.value;
  throw createError('에러가 발생했습니다.');
};
</script>

<style scoped></style>
