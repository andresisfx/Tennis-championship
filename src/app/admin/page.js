'use client';
import React from 'react';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { query, collection, where, getDocs, setDoc,doc } from 'firebase/firestore';
import { db } from '../firebase';
import Loading from "../signin/loading"

const AdminPanel = () => {
   const[userRole,setuserRole]=useState(true)
   const[loading,setLoading]=useState(false)
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/signin');
        },}) 

   const router = useRouter();
   const adminAllowed = async (email) => {
    try {
    const usersRef = collection(db, 'usersRole');
    const emailToSignQuery = query(usersRef, where('email', '==',email.toString()));

    const querySnapshot = await getDocs(emailToSignQuery);

    if (!querySnapshot.empty) {
      setuserRole(false)
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
     console.log(userData.role)
         
      if (userData.role !== 'admin') {
        router.push('/signin');
        
      } else {
      return
        
        
      }
    } else {
      alert('User not found.');
      return false;
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
    return false;
  }

}
useEffect(() => {
  const verificarSesion = async () => {
    if (session?.data?.user?.email) {
      adminAllowed(session.data.user.email);
    }
    setLoading(false);
  };

  if (!loading) {
    setLoading(true);

    verificarSesion();
  }
}, [loading, session,adminAllowed]);
  const handleButtonClick = (path) => {
    router.push(path);
  };
if(loading||userRole){
  return(
    <>
       <Loading></Loading>
    </>
  )
}
  return (
    <div className="flex min-h-screen bg-green-500 p-4 mt-10">
    
      <h1 className="text-3xl font-bold text-white mb-15 mt-2">Welcome, Admin</h1>
      <div className="w-1/2 bg-indigo-500 p-4 mt-16 rounded-md">
      <h2 className="text-4xl font-bold text-white mb-4 text-center">Admin Panel</h2>

        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className="text-2xl h-20 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/registerAdmin')}
              >
                Create Admin
              </button>
            </li>
            <li>
              <button
                className="text-2xl h-20 mt-10 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/createChampionship')}
              >
                Create Championship
              </button>
            </li>
            <li>
              <button
                className="text-2xl h-20 mt-10 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/viewTournaments')}
              >
                View Championships
              </button>
            </li>
           
          </ul>
        </nav>
      </div>
       <div className="p-8 bg-blue-500 rounded-2xl border-4 border-white-200 h-28 mr-10 ml-auto">
          <div className='text-white'>
            Usuer: {session?.data?.user?.email }
          </div>
              <button
                className='text-white bg-red-500 hover:bg-red-800 py-2 px-4 rounded-2xl'
                 onClick={() => signOut()}>
               Logout
            </button>
                
       </div>
    
    </div>
  );
};
AdminPanel.requireAuth = true

export default AdminPanel;
