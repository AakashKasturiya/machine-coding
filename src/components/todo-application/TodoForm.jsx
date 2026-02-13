import { useState } from "react";
import { toast } from 'react-toastify'; // We’ll use react-toastify

export const TodoForm = ({addTodo}) => {
const [input, setInput] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
if (input.trim().length === 0) {
setError('Todo cannot be empty');
toast.error('Todo cannot be empty');
return;
}


addTodo(input.trim());
toast.success('Todo added successfully');
setInput('');
setError('');
};

return (
<div className="mb-6">
  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full items-start">
    <div className="flex-1">
      <input type="text" id="todoInput" placeholder="Add new task..." value={input} onChange={(e)=>
      setInput(e.target.value)}
      className="add-input w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none
      focus:border-primary" />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
    <button id="addBtn" type="submit"
      className="!rounded-button whitespace-nowrap px-6 py-3 bg-primary text-white hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center w-full sm:w-12 h-12">
      <i className="ri-add-line text-xl"></i>
    </button>
  </form>
</div>
)
}