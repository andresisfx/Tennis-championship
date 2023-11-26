'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const adminAllowed = async (email) => {
  const router=useRouter()
    try {
    const usersRef = collection(db, 'usersRole');
    const emailToSignQuery = query(usersRef, where('email', '==',email.toString()));

    const querySnapshot = await getDocs(emailToSignQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

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
    // Maneja cualquier error relacionado con la consulta o autenticación
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
    return false;
  }
  return(
    <div className='p-8'>
      <h1 className='p-8'>si cargo </h1>
    </div>
  )
};

export default adminAllowed;
