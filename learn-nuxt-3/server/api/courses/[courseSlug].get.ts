import { getCourseDetails } from '~/server/models/course';

export default defineEventHandler((event) => {
  const courseSlug = getRouterParam(event, 'courseSlug') as string;
  const courseDetails = getCourseDetails(courseSlug);

  if (!courseDetails.course) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server Error',
    });
  }
  return courseDetails;
});
