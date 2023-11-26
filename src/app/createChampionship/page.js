'use client';
import React, { useState,useEffect } from 'react';
import { query, collection, where, getDocs, setDoc,doc } from 'firebase/firestore';
import { signOut, useSession } from 'next-auth/react';
import { redirect,useRouter } from 'next/navigation';
import { db } from '../firebase';
import Loading from "../signin/loading"

const CreateChampionship = () => {

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
    console.log("redireccionando")
       router.push('/signin');
       
     } else {
       console.log("no entre al condicional del rol")
       
       
     }
   } else {
     alert('User not found.');
     return false;
   }
 } catch (error) {
   // Maneja cualquier error relacionado con la consulta o autenticación
   console.error('Error:', error.message);
   alert('An error occurred. Please try again.');
   return false;
 }

}
// eslint-disable-next-line react-hooks/exhaustive-deps
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
}, [loading, session]);
 
if(loading||userRole){
 return(
   <>
      <Loading></Loading>
   </>
 )
}
  const [championshipName, setChampionshipName] = useState('');
 
 

  const handleSubmit= async (e) => {
    e.preventDefault();
    if (!championshipName) {
      alert('Please enter the championship name.');
      return;
    }

    try {
      await setDoc(doc(db, 'championships',championshipName.toString()), {
        participants:"",
        
      });
      alert('Championship created successfully.');

      setChampionshipName('');

    } catch (error) {
      console.log('Error creating championship:', error.message);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-md p-8 max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Create New Championship</h2>
    <button
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-500 focus:ring-blue-500"
      onClick={() => router.push('/admin')}
    >
      Go Back to Admin Panel
    </button>
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="championshipName" className="block text-sm font-medium leading-6 text-gray-700">
          Championship Name
        </label>
        <input
          id="championshipName"
          name="championshipName"
          type="text"
          value={championshipName}
          onChange={(e) => setChampionshipName(e.target.value)}
          autoComplete="off"
          className="block w-full rounded-md border border-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-500 mt-4"
        >
          Create Championship
        </button>
      </div>
    </form>
    
  </div>
  );
};
CreateChampionship.requireAuth=true
export default CreateChampionship;
