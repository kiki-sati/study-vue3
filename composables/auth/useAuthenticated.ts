import { useAuthUser } from './useAuthUser';

export const useAuthenticated = () => computed(() => !!useAuthUser().value);
