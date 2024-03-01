// 'use client';
// import { Session } from 'inspector';
// import { signOut, useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// export default function Home() {
//   const session = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect('/signin');
//     },
//   });
//   console.log(session)
//   return (
//     <div className="p-8">
//       <div className='text-white'>{session?.data?.user?.email }</div>
//       <button className='text-white' onClick={() => signOut()}>Logout</button>
//     </div>
//   )
// }

// Home.requireAuth = true
'use client';
import { useRouter } from 'next/navigation';
import styles from './Welcome.module.css';

const Welcome = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signin');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-800 text-white overflow-hidden">
    
      <h1
        className={`absolute text-4xl font-bold text-gray-700 ${styles['animate-move1']}`}
        style={{ top: '50%', left: '30%', transform: 'translate(-50%, -50%)' }}
      >
        Let&#x27;s go
      </h1>

     

      <h1 className="text-6xl font-extrabold mb-8 transform -rotate-6 font-mono text-black animate-bounce">
        Welcome to Tennis-app
      </h1>
      <button
        className="bg-green-500 text-white py-4 px-8 rounded-md text-xl font-semibold hover:bg-green-400 focus:outline-none focus:ring focus:border-green-500 focus:ring-green-500"
        onClick={handleGetStarted}
      >
        Let's Get Started
      </button>
    </div>
  );
};

export default Welcome;
