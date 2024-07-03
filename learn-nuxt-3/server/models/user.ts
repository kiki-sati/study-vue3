import type { User } from '~/types/user';

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

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}
