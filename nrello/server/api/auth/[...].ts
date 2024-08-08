import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "~/server/models/User";

// userId 기준으로 사용자를 찾는다.
async function getUser(id: string) {
  const user = await User.findById(id);
  return user?.toJSON();
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.secret,

  // 로그인 페이지
  pages: {
    signIn: "/auth/signin",
  },

  // 인증 제공자 설정
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      name: "credentials",
      origin: useRuntimeConfig().auth.origin,

      // 로그인
      async authorize(credentials: { email: string; password: string }) {
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          return null;
        }

        const isValid = await user.comparePassword(credentials.password);

        if (!isValid) {
          return null;
        }

        return user.toObject();
      },
    }),
  ],
// JWT 기반 세션 관리
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },
    // 세션 콜백
    async session({ session, token }) {
      // @ts-expect-error
      const refreshedUser = await getUser(token._id);

      // 세션에 사용자 정보 맵핑
      session.user = {
        ...token,
        ...session.user,
        ...refreshedUser,
      };
      return session;
    },
  },
});
