"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { getDocs, query, collection, where,doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc  } from 'firebase/firestore';


const ParticipantItem = ({ id, name, score,tournamentId }) => {
    const [editedScore, setEditedScore] = useState('');
    const [isScoreValid, setIsScoreValid] = useState(true);

    const handleEditScore = () => {
      if (editedScore === '' || !/^\d+$/.test(editedScore)) {
        setIsScoreValid(false);
      } else {
        console.log(`Editar puntaje del participante con ID: ${id}, nuevo puntaje: ${editedScore}`);
        setEditedScore('');
        setIsScoreValid(true);
      }
    };

    const handleInputChange = (event) => {
      const value = event.target.value;
      setEditedScore(value);
      setIsScoreValid(/^\d*$/.test(value) || value === '');
    };

    return (
      <div key={id} className="bg-green-500 rounded-md p-4 text-white mb-4 w-full">
        <h3 className="text-3xl font-semibold mb-2">{name}</h3>
        <p className="w-full">Score: {score}</p>
        <div className="flex space-x-2 mt-4 w-full">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md w-1/4"
            onClick={() => setDeleteConfirmation(id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-1/4"
            onClick={handleEditScore}
          >
            Edit Score
          </button>
        </div>
        {deleteConfirmation === id && (
          <div className="mt-4 w-full">
            <p>Are you sure you want to delete this participant?</p>
            <button
              className="w-1/4 bg-red-500 text-white py-2 px-4 rounded-md mr-2 "
              onClick={() => handleDelete(id)}
            >
              Yes
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full w-1/4"
              onClick={() => setDeleteConfirmation(null)}
            >
              No
            </button>
          </div>
        )}
        <div className="mt-4 w-full">
          <label className="block text-white">Edit Score:</label>
          <input
            type="text"
            value={editedScore}
            onChange={handleInputChange}
            className={`w-1/8 p-2 border rounded ${isScoreValid ? 'border-gray-400 text-black' : 'border-red-500 text-black'}`}
          />
          {!isScoreValid && editedScore !== '' && (
            <p className="text-red-500">Please enter a valid score (numbers only).</p>
          )}
        </div>
      </div>
    );
  };

  export default ParticipantItem