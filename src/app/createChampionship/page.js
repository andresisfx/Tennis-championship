'use client';
import React, { useState } from 'react';
import { db,  } from '../firebase';
import { query, collection, where, getDocs, addDoc } from 'firebase/firestore';


const CreateChampionship = () => {
  const [championshipName, setChampionshipName] = useState('');

  const handleSubmit= async () => {
    if (!championshipName) {
      alert('Please enter the championship name.');
      return;
    }

    try {
      await addDoc(collection(db, 'championships'), {
        name: championshipName,
        
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

export default CreateChampionship;
