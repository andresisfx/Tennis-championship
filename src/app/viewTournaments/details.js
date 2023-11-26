"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { getDocs, query, collection, where,deleteDoc,doc,updateDoc } from 'firebase/firestore';

const ParticipantsList = ({ tournamentId }) => {
  const [participants, setParticipants] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleDelete = async (participantId) => {
    try {
      await deleteDoc(doc(db, 'participants', participantId));
  
      setParticipants((prevParticipants) => prevParticipants.filter((participant) => participant.id !== participantId));
      setDeleteConfirmation(null);
    } catch (error) {
      console.log('Error deleting participant from database:', error);
    }
  };

  const getParticipants = async () => {
    const initialParticipants = await getDocs(query(collection(db, 'participants'), where('championshipid', '==', tournamentId)));
    const participantsData = initialParticipants.docs.map((doc) => ({ id: doc.id, ...doc.data(), editedScore: '', isScoreValid: true }));
    setParticipants(participantsData);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getParticipants();
  }, [tournamentId]);

  const handleEditScore = async (participantId) => {
    const editedParticipantIndex = participants.findIndex((participant) => participant.id === participantId);
  
    if (editedParticipantIndex !== -1) {
      const editedParticipant = participants[editedParticipantIndex];
  
      if (editedParticipant && (editedParticipant.editedScore === '' || !/^\d+$/.test(editedParticipant.editedScore))) {
        console.log(`Score is not valid for participant ID: ${participantId}`);
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.id === participantId ? { ...participant, isScoreValid: false } : participant
          )
        );
      } else {
        try {
          // Actualizar el campo score en la base de datos
          await updateDoc(doc(db, 'participants', participantId), {
            score: editedParticipant.editedScore,
          });
  
          // Actualizar el estado local para reflejar el nuevo score
          setParticipants((prevParticipants) =>
            prevParticipants.map((participant) =>
              participant.id === participantId
                ? { ...participant, editedScore: '', isScoreValid: true, score: editedParticipant.editedScore }
                : participant
            )
          );
          console.log(`Successfully updated score for participant ID: ${participantId}`);
        } catch (error) {
          console.error('Error updating score in database:', error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
      }
    }
  };
  const handleInputChange = (event, participantId) => {
    const value = event.target.value;
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === participantId ? { ...participant, editedScore: value, isScoreValid: /^\d*$/.test(value) || value === '' } : participant
      )
    );
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Participants</h2>
      <div className="mt-10 mx-auto w-full space-y-4">
        {participants?.map((participant) => (
          <div key={participant.id} className="bg-green-500 rounded-md p-4 text-white mb-4 w-full">
            <h3 className="text-3xl font-semibold mb-2">{participant.name}</h3>
              <p className="w-full">Score: {participant.score}</p>
            <div className="flex space-x-2 mt-4 w-full">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md w-1/4"
                onClick={() => setDeleteConfirmation(participant.id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md w-1/4"
                onClick={() => handleEditScore(participant.id)}
                disabled={!participant.isScoreValid}
              >
                Edit Score
              </button>
            </div>
            {deleteConfirmation === participant.id && (
              <div className="mt-4 w-full">
                <p>Are you sure you want to delete this participant?</p>
                <button
                  className="w-1/4 bg-red-500 text-white py-2 px-4 rounded-md mr-2 "
                  onClick={() => handleDelete(participant.id)}
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
                value={participant.editedScore}
                onChange={(event) => handleInputChange(event, participant.id)}
                className={`w-1/8 p-2 border rounded ${participant.isScoreValid ? 'border-gray-400 text-black' : 'border-red-500 text-black'}`}
              />
              {!participant.isScoreValid && participant.editedScore !== '' && (
                <p className="text-red-500">Please enter a valid score (numbers only).</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;


