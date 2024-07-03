// /auth/post (POST)

import { getUserByEmail } from '~/server/models/user';

export default defineEventHandler(async (event) => {
  const body = readBody<{ email: string; password: string }>(event);

  const { email, password } = await body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email address and password are required',
    });
  }

  const userWithPassword = getUserByEmail(email);

  if (!userWithPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Bad credentials',
    });
  }

  const verified = verifyPassword(password, userWithPassword.password);
  if (!verified) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Bad credentials',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  const config = useRuntimeConfig();
  setCookie(event, config.authCookieName, JSON.stringify(userWithoutPassword));

  return {
    user: userWithoutPassword,
  };
});
