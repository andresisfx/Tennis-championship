

// import { collection, getDocs, where, query } from 'firebase/firestore';
// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials";
// import {signInWithEmailAndPassword} from 'firebase/auth';
// import { auth } from "@/app/firebase";


// export const authOptions = {
//   // Configure one or more authentication providers
//   pages: {
//     signIn: '/signin'
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {},
//       async authorize(credentials) {
//         return await signInWithEmailAndPassword(auth, (credentials ).email || '', (credentials ).password || '')
//           .then(userCredential => {
//             if (userCredential.user) {
//               return userCredential.user;
//             }
//             return null;
//           })
//           .catch(error => (console.log(error)))
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(error);
//     alert("Invalid email or password")
//   });
//       }
//     })
//   ],
// }
// export default NextAuth(authOptions)



// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials";
// import {signInWithEmailAndPassword} from 'firebase/auth';
// import { auth } from "@/app/firebase";


// export const authOptions = {
//   // Configure one or more authentication providers
//   pages: {
//     signIn: '/signin'
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {},
//       async authorize(credentials): Promise<any> {
//         return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
//           .then(userCredential => {
//             if (userCredential.user) {
//               return userCredential.user;
//             }
//             return null;
//           })
//           .catch(error => (console.log(error)))
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(error);
//   });
//       }
//     })
//   ],
// }
// export default NextAuth(authOptions)


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/signin`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/user', '/admin']
};