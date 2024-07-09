import {getServerSession} from "#auth";
import {getRequestURL} from "h3";

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event);

    const protectedRoutes = ['/api/users', 'api/boards', '/api/lists'];
    const isProtectedRoute = protectedRoutes.some((route) => getRequestURL(event).pathname.startsWith(route));
    if (!isProtectedRoute) {
        return;
    }

    if (!session) {
        throw createError({
            statusCode: 401,
            statusMessage:"인증되지 않음",
            message:"이 리소스에 액세스하려면 로그인해야 합니다."
        })
    }
    event.context.user = session.user
});