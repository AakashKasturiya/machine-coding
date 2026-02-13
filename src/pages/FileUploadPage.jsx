import React from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import { FileUpload } from '../components/FileUpload/FileUpload';


export const FileUploadPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>

      <Introduction TasksData={TasksData}/>
      <FileUpload />
      <CodingPreview TasksData={TasksData}/>
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2"><strong>Drag & Drop Events:</strong> Handles <code>onDragOver</code>, <code>onDragLeave</code>, <code>onDrop</code> for a smooth dropzone UX.</li>
          <li className="text-gray-600 mb-2"><strong>File Validation:</strong> Checks MIME type (PNG/JPEG/PDF) and max size before accepting the file.</li>
          <li className="text-gray-600 mb-2"><strong>Preview via Object URL:</strong> Uses <code>URL.createObjectURL</code> for image preview and cleans up with <code>URL.revokeObjectURL</code>.</li>
          <li className="text-gray-600 mb-2"><strong>UX States:</strong> Maintains <code>error</code>, <code>uploading</code>, <code>success</code>, and <code>progress</code> to guide the user.</li>
          <li className="text-gray-600 mb-2"><strong>Replace / Remove:</strong> Resets input and state so the user can re-upload quickly without refresh.</li>
        </ul>
      </div>
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">✅ Why This Is a Good Approach:</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2"><strong>Prevents bad uploads early:</strong> Validation happens immediately (type + size), reducing server failures.</li>
          <li className="text-gray-600 mb-2"><strong>Clear feedback:</strong> Error states, disabled button during upload, and progress indicator improve trust.</li>
          <li className="text-gray-600 mb-2"><strong>Memory safe preview:</strong> Object URL is revoked so previews don’t leak memory.</li>
          <li className="text-gray-600 mb-2"><strong>Reusable component:</strong> Easy to extend for multiple files, real API upload, or additional validation.</li>
          <li className="text-gray-600 mb-2"><strong>Good interview story:</strong> Shows event handling, state management, validation, cleanup, and UX thinking.</li>
        </ul>
      </div>

    </div>
  );
};



