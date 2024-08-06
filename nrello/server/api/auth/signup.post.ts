import {Validator} from "#nuxt-server-utils";
import SignupSchema from "~/schemas/Signup.schema";
import {User} from "~/server/models/User";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    Validator.validateSchema(SignupSchema, body )

    const user = await User.create(body)

    return {...user.toObject(), password: undefined}
});
