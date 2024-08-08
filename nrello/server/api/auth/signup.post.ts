import {Validator} from "#nuxt-server-utils";
import SignupSchema from "~/schemas/Signup.schema";
import {User} from "~/server/models/User";

export default defineEventHandler(async (event) => {

    try {
        // 요청 body 읽기
        const body = await readBody(event);

        // 유효성 검증
        Validator.validateSchema(SignupSchema, body);

        // 유효성 검증 통과하여 회원 정보 생성
        const user = await User.create(body);

        return { ...user.toObject(), password: undefined };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "서버 오류",
            message: "오류가 발생하였습니다. 확인해주세요"
        })
    }
});
