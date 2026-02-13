import React from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import Login from "../components/Login/Login";


export const LoginPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>

      <Introduction TasksData={TasksData}/>
      <Login />
      <CodingPreview TasksData={TasksData}/>
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2"><strong>Controlled Form Inputs:</strong> Username and password are stored in state and updated using <code>onChange</code>.</li>
          <li className="text-gray-600 mb-2"><strong>Auth via Context:</strong> The <code>useAuth</code> hook exposes <code>login</code>/<code>logout</code> and stores the authenticated user.</li>
          <li className="text-gray-600 mb-2"><strong>Persisting Session:</strong> A token is saved in <code>localStorage</code> to simulate session persistence.</li>
          <li className="text-gray-600 mb-2"><strong>Protected Routes:</strong> A wrapper route checks auth state and redirects to <code>/login</code> if the user is not authenticated.</li>
          <li className="text-gray-600 mb-2"><strong>Programmatic Navigation:</strong> On successful login, <code>useNavigate</code> redirects the user to the dashboard.</li>
        </ul>
      </div>
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">✅ Why This Is a Good Approach:</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2"><strong>Separation of concerns:</strong> UI stays in the page/component while auth logic lives in a dedicated context.</li>
          <li className="text-gray-600 mb-2"><strong>Easy to scale:</strong> You can replace the fake login with a real API without changing the page layout.</li>
          <li className="text-gray-600 mb-2"><strong>Consistent UX:</strong> Redirecting unauthenticated users protects private pages and avoids broken states.</li>
          <li className="text-gray-600 mb-2"><strong>Reusable pattern:</strong> The same protected route approach works for role-based access later.</li>
          <li className="text-gray-600 mb-2"><strong>Great interview story:</strong> Covers forms, context, routing, persistence, and navigation in one flow.</li>
        </ul>
      </div>

    </div>
  );
};
