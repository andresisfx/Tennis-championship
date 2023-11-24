'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const AdminPanel = () => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-screen bg-green-500 p-4 mt-10">
      {/* Sidebar con botones */}
      <h1 className="text-3xl font-bold text-white mb-15 mt-2">Welcome, Admin</h1>
      <div className="w-1/2 bg-indigo-500 p-4 mt-16 rounded-md">
      <h2 className="text-4xl font-bold text-white mb-4 text-center">Admin Panel</h2>

        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className="text-2xl h-20 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/registerAdmin')}
              >
                Create Admin
              </button>
            </li>
            <li>
              <button
                className="text-2xl h-20 mt-10 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/createChampionship')}
              >
                Create Championship
              </button>
            </li>
            <li>
              <button
                className="text-2xl h-20 mt-10 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/viewTournaments')}
              >
                View Championships
              </button>
            </li>
           
          </ul>
        </nav>
      </div>

    
    </div>
  );
};

export default AdminPanel;
