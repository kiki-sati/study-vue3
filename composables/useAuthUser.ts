import exp from 'node:constants';
import type { UserWithoutPassword } from '~/types/user';

// 상태를 중앙에서 관리하기 위해서는 피니아를 사용해야한다. (현재는 임시)
const authUser = ref<Maybe<UserWithoutPassword>>(null);

export const useAuthUser = () => {
  // 상태는 컴포넌트 단위로 생성된다.
  const isAuthenticated = computed(() => !!authUser.value);
  const isAdmin = computed(() => !!authUser.value?.roles.includes('ADMIN'));

  return {
    authUser,
    isAuthenticated,
    isAdmin,
  };
};
