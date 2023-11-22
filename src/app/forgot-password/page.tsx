'use client';
import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from 'next/navigation';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter()
  const resetEmail = async() => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Please check out your email and log in');
      alert('Please checkout your email' );
      setErrorMessage('');  
      router.push('signin')
      
      setEmail('');
    } catch (error:any) {
      alert('smething went wrong, maybe your email is not registered' );
      setErrorMessage('Hubo un error al enviar el correo electrónico de restablecimiento. Verifica la dirección de correo electrónico e inténtalo de nuevo.');
      setSuccessMessage(''); 
    }
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
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
              <button
                onClick={() => resetEmail()}
                disabled={!email}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Send Forgot Password Email
              </button>
              {successMessage && (
              <div className="text-green-500 text-center">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}