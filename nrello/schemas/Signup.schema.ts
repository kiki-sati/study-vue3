import {z} from 'zod'

export default z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
}).refine(data => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ['passwordConfirm'],
});
