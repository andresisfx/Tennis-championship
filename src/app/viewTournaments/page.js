"use client";
import React, { useState, useEffect } from 'react';
import ParticipantsList from './details';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { query, collection, where, getDocs, setDoc,doc } from 'firebase/firestore';
import { db } from '../firebase';
import Loading from "../signin/loading"

const TournamentPanel = () => {
  
  'use client';


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
  const handleButtonClick = (path) => {
    router.push(path);
  };


  
  const [championships, setChampionships] = useState([]);
  const [tournamentFormInfo, setTournamentFormInfo] = useState({ showForm: false, tournamentId: null });
  const getTournaments = async () => {
    const response = collection(db, 'championships');
    const tournamentsSnapshot = await getDocs(response);
    const tournamentsData = tournamentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setChampionships(tournamentsData);
  };

  useEffect(() => {
    getTournaments();
  }, []);

  const handleRegisterClick = (tournament) => {
    setTournamentFormInfo({ showForm: true, tournamentId: tournament });
  };

  const handleRegistrationFormClose = () => {
    setTournamentFormInfo({ showForm: false, tournamentId: null });
  };

  if(loading||userRole){
    return(
      <>
         <Loading></Loading>
      </>
    )
  }
 
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className=" mx-auto  h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      <h2 className="mt-0 text-center text-5xl font-bold leading-9 tracking-tight text-white">
        Championships panel
      </h2>
    </div>
  
    <div className="mt-10 mx-auto w-full space-y-4 bg-white bg-opacity-75 p-4 rounded-md">
      {championships?.map((tournament) => (
        <div key={tournament.id} className="bg-indigo-500 rounded-md p-4 text-white ">
          <h3 className="text-3xl font-semibold mb-4 text-center">{tournament.id}</h3>
          <button
            onClick={() => handleRegisterClick(tournament.id)}
            className=" mx-auto w-1/4 bg-indigo-700 text-white py-2 px-4 rounded-md transform transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500mx-auto w-1/4 bg-indigo-700 text-white py-2 px-4 rounded-md transform transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center justify-center h-full"
          >
           Show details
          </button>
          {tournamentFormInfo.showForm && tournamentFormInfo.tournamentId === tournament.id && tournamentFormInfo.tournamentId ? (
            <ParticipantsList tournamentId={tournamentFormInfo.tournamentId} onClose={handleRegistrationFormClose} />
          ) : null}
        </div>
      ))}
    </div>
  </div>
  
  );
};
TournamentPanel.requireAuth=true
export default TournamentPanel;

