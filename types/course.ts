export interface Course {
  title: string;
  subtitle: string;
  courseSlug: string;
  content: string;
  thumbnail: string;
  video: string;
  rating: number;
  reviewsCount: number;
  studentCount: number;
  reviewsUrl: string;
  inflearnUrl: string;
  gymcodingUrl: string;
}

export interface CourseWithPath
  // 특정 속성 제외하고 재사용
  extends Omit<Course, 'rating' | 'reviewsCount' | 'studentCount'> {
  rating: string;
  reviewsCount: string;
  studentCount: string;
  path: string;
}

export interface CourseReturn {
  course: Maybe<CourseWithPath>; // Course | null | undefined
  prevCourse: Maybe<CourseWithPath>;
  nextCourse: Maybe<CourseWithPath>;
}
