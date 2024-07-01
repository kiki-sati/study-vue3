import { getCourses } from '~/server/models/course';

export default defineEventHandler(() => {
  return getCourses();
});
