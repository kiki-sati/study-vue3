import { getUser } from './userData';
import type { UserWithoutPassword } from '~/types/user';
import { useAuthUser } from '~/composables/auth/useAuthUser';

export const useAuth = () => {
  // const { authUser } = useAuthUser();
  const authUser = useAuthUser();

  const signIn = (email: string, password: string) => {
    const foundUser = getUser(email, password);

    if (!foundUser) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      });
    }

    setUser(foundUser);
  };

  const setUser = (user: Maybe<UserWithoutPassword>) => (authUser.value = user);
  const signOut = () => setUser(null);

  return {
    signIn,
    signOut,
  };
};
