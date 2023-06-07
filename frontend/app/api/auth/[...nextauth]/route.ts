import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const serverJwt = res.headers.get("set-cookie");
        const data = await res.json();
        if (res.ok && data["user"] && serverJwt) {
          const parsedServerJwt = serverJwt.split(";")[0].replace("token=", "");
          return { username: data["user"], sToken: parsedServerJwt };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.sToken = user.sToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.username;
      session.sToken = token.sToken;
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
