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
        <h2 className="text-2xl font-bold text-white mb-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/registerAdmin')}
              >
                Create Admin
              </button>
            </li>
            <li>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/admin/create-championship')}
              >
                Create Championship
              </button>
            </li>
            <li>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/admin/view-championships')}
              >
                View Championships
              </button>
            </li>
            <li>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/admin/view-participants')}
              >
                View Participants
              </button>
            </li>
            <li>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/admin/assign-scores')}
              >
                Assign Scores
              </button>
            </li>
            <li>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={() => handleButtonClick('/admin/delete-participant')}
              >
                Delete Participant
              </button>
            </li>
          </ul>
        </nav>
      </div>

    
    </div>
  );
};

export default AdminPanel;
