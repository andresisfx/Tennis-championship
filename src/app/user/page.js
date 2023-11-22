"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';
console.log(db)

const TournamentPanel = () => {
  const [championships,setChampionships] = useState();

  const getTournaments = async () => {
    const response = collection(db, 'championships');
    const tournamentsSnapshot = await getDocs(response);
  
    // Extraer datos de los documentos en el QuerySnapshot
    const tournamentsData = tournamentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
    setChampionships(tournamentsData);
  };
    console.log(championships)
 useEffect(()=>{
   getTournaments()
 },[])
  const registerParticipant = () => {
    // Lógica para registrar al participante en la colección 'participants'
    // Puedes agregar el código necesario para interactuar con Firebase Firestore aquí
    // Por ejemplo, firestore.collection('participants').add({name, email, tournamentId});
  };
  const divStyle = {
    backgroundImage: 'url(/descarga.avif)',
    backgroundSize: 'cover',  // Ajusta esto según tus necesidades
    backgroundPosition: 'center',  // Ajusta esto según tus necesidades
    backgroundRepeat: 'no-repeat',  // Ajusta esto según tus necesidades
  }; 
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4 bg-green">
          {championships?.map(tournament => (
            <div key={tournament.id} className="bg-white rounded-md p-4"  style={divStyle}>
               
              <h3 className="text-xl font-semibold mb-2">{tournament.id}</h3>
              <button
                // onClick={() => registerParticipant(tournament.id)}
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TournamentPanel;
