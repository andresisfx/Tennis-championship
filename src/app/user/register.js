"use client";
import React, { useState } from 'react';
import { query, collection, where, getDocs, addDoc } from 'firebase/firestore';

import { db } from '../firebase';


const MyForm = ({tournamentId}) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!tournamentId) {
      alert('There is no championship available');
      return;
    }
  
    try {
      const participantsRef = collection(db, 'participants');
      const existingParticipantQuery = query(participantsRef, where('email', '==', email.toString()));
  
      const existingParticipants = await getDocs(existingParticipantQuery);
  
      if (existingParticipants.docs.length > 0) {
        alert('This email is already registered.');
        setUsername("");
        setEmail("")
        return;
      }
  
      // Si no existe un participante con el mismo correo electrónico, procede con el registro
      await addDoc(participantsRef, {
        championshipid: tournamentId.toString(),
        email: email.toString(),
        name: username.toString(),

      });
      alert("successfully registered")
      setUsername("");
      setEmail("")
     
  
    } catch (error) {
      console.log('Something went wrong:', error.message);
      alert('Something went wrong:', error.message);
    }
  };
  
  // console.log('Datos del formulario:', { username, email,tournamentId });
  return (
    <div className="mt-4 p-4 bg-transparent rounded-md">
    <h2 className="text-xl font-bold leading-9 tracking-tight text-white mb-4">Register for Championship</h2>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  )
};

export default MyForm;
