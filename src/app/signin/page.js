
'use client';


import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { query, collection, where, getDocs, setDoc,doc } from 'firebase/firestore';
import { db } from '../firebase';



export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 
  

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const usersRef = collection(db, 'usersRole');
      const emailToSignQuery = query(usersRef, where('email', '==', email.toString()));
  
      const querySnapshot = await getDocs(emailToSignQuery);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log(userData.role)
        userData.role === 'admin'
        ? await signIn('credentials', { email, password, redirect: true, callbackUrl: '/admin' })
        : userData.role === 'user'
          ? await signIn('credentials', { email, password, redirect: true, callbackUrl: '/user' })
          : (() => {
              setError('Invalid role for the user.');
              alert('Invalid role for the user.');
            })();
      
      } else {
        setError('User not found.');
        alert('User not found.');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      alert('Invalid email or password.');
    }
  };
  

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h1 className="text-white">Please copy these users to test the app</h1>
          <h1 className="text-white">maria@gmail.com  - password: 1234567 (you can see admin role)</h1>
          <h1 className="text-white">user1@gmail.com   - password: 1234567 (you can see user role)</h1>
          
        </div>  
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <div onClick={() => router.push('/forgot-password')} className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!email || !password}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <p className="mt-10 text-center text-sm text-gray-400">
              Not a member?{' '}
              <button onClick={() => router.push('signup')} className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
