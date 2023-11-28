'use client';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import { signOut, useSession } from 'next-auth/react';
import { redirect,useRouter } from 'next/navigation';
import { query, collection, where, getDocs, setDoc,doc } from 'firebase/firestore';
import { useEffect } from 'react';
import Loading from "../signin/loading"

const AdminRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  


  const[userRole,setuserRole]=useState(true)
  const[loading,setLoading]=useState(false)
   const session = useSession({
       required: true,
       onUnauthenticated() {
         redirect('/signin');
       },}) 


 

useEffect(() => {
  const adminAllowed = async (email) => {
    console.log("admin allowed execting")
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
}, [loading, session]);
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

 
    


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await setDoc(doc(db, 'usersRole', user.uid), {
        email: email,
        role: 'admin',
      });

     
      setEmail('');
      setPassword('');

      alert('Admin registered successfully.');
    } catch (error) {
      console.log('Error registering admin:', error.message);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-md p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register New Admin</h2>
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-500 focus:ring-blue-500"
        onClick={() => router.push('/admin')}
      >
        Go Back to Admin Panel
      </button>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="block w-full rounded-md border border-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="block w-full rounded-md border border-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-500"
          >
            Register Admin
          </button>
        </div>
      </form>
    </div>
  );
};
AdminRegistration.requireAuth = true
export default AdminRegistration;

