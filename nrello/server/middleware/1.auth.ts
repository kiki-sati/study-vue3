import { getServerSession } from "#auth";
// @ts-ignore
import { getRequestURL } from "h3";

const protectedRoutes = ["/api/users", "/api/boards", "/api/lists"];

export default defineEventHandler(async (event) => {
  // 세션 정보 가져오기
  const session = await getServerSession(event);

  // 요청 URL 가져오기
  const requestURL = getRequestURL(event);

  // 보호된 경로인지 확인
  const isProtectedRoute = protectedRoutes.some((route) =>
    requestURL.pathname.startsWith(route)
  );

  // 보호된 경로가 아닌 경우 처리하지 않음
  if (!isProtectedRoute) {
    return;
  }

  // 세션이 없는 경우 에러 반환
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "로그인 후 접근할 수 있습니다.",
    });
  }

  // 사용자 정보를 이벤트 컨텍스트에 추가
  event.context.user = session.user;
});
