import type { User, UserWithoutPassword } from '~/types/user';

const users: User[] = [
  {
    id: '66fad0b6-06d0-4767-9ef3-fe9d0173add2',
    email: 'admin@gmail.com',
    password: 'qwer1234',
    roles: ['ADMIN'],
  },
  {
    id: 'c7c00dae-8e59-4029-83e2-4b265eb54a22',
    email: 'user@gmail.com',
    password: 'qwer1234',
    roles: ['USER'],
  },
];

export const getUser = (
  email: string,
  password: string,
): Maybe<UserWithoutPassword> => {
  const foundUser = users.find(
    (u) => u.email === email && u.password === password,
  );
  if (foundUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  }
};
