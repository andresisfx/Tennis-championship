"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';
import MyForm from './register';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';





const TournamentPanel = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Tournament Registration
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4 bg-green-500 bg-opacity-75 p-4 rounded-md">
        {championships?.map((tournament) => (
          <div key={tournament.id} className="bg-indigo-500 rounded-md p-4 text-white">
          <h3 className="text-3xl font-semibold mb-4 text-center">{tournament.id}</h3>
          <button
            onClick={() => handleRegisterClick(tournament.id)}
            className="w-full bg-indigo-700 text-white py-2 px-4 rounded-md transform transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Register
          </button>
          {tournamentFormInfo.showForm && tournamentFormInfo.tournamentId === tournament.id && tournamentFormInfo.tournamentId? (

            <MyForm tournamentId={tournamentFormInfo.tournamentId} onClose={handleRegistrationFormClose} />
          ):null}
        </div>
        
        
        ))}
      </div>
      
    </div>
  );
};
TournamentPanel.requireAuth = true
export default TournamentPanel;
