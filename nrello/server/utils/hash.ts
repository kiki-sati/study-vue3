import bcrypt from 'bcryptjs'

// 비밀번호 생성을 위한 Hash 설치
export async function generateHash(data: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
}