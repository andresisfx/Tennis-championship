'use client';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/navigation';

const AdminRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      // Create a user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Access the user from the userCredential
      const user = userCredential.user;

      // Set additional user data in Firestore
      await setDoc(doc(db, 'usersRole', user.uid), {
        email: email,
        role: 'admin',
      });

      // Reset the form state after submitting data
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

export default AdminRegistration;

