import React from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { formSchema } from "../components/DynamicForm/formSchema";
import { DynamicForm } from "../components/DynamicForm/DynamicForm"
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';


export const DynamicFormPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />
      <DynamicForm schema={formSchema} />
      <CodingPreview TasksData={TasksData} />
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2"><strong>Dynamic rendering:</strong>Renders inputs based on schema map.</li>
          <li className="text-gray-600 mb-2"><strong>Controlled Components:</strong> Inputs use value and onChange.</li>
          <li className="text-gray-600 mb-2"><strong>useState: </strong>	Manages form values and submitted data.</li>
          <li className="text-gray-600 mb-2"><strong>Form Validation:</strong> 	Required fields (basic HTML validation).</li>
          <li className="text-gray-600 mb-2"><strong>JSON display:</strong> 	Form data is shown in JSON on submit.</li>
        </ul>
      </div>

    </div>
  );
};



