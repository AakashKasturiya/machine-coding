import React, { useState, useEffect } from 'react'

import "./todo.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';  // We’ll use react-toastify
import TodoList from './TodoList';
import { TodoForm } from './TodoForm'
import { TodoFilter } from "./TodoFilter";

const FILTERS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};


export const TodoApp = () => {
  
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [loading, setLoading] = useState(true);

  /*1. Data Get from the local Storage */
useEffect(() => {
  try {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  } catch (error) {
    console.error('Failed to load todos:', error);
    setTodos([]);
  } finally {
    setLoading(false);
  }
}, []);

   /*2. Data Store in the local Storage */
  useEffect(() => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
  }, [todos]);

  
  /*3. Add Todo */
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  /*4. Update or Edit Todo */
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  /*3. Complete Todo */
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  /*4. Delete Todo */
  const deleteTodo = (id) => {
     setTodos(todos.filter(todo => todo.id !== id));
     toast.info('Todo deleted');
  };

const reorderTodos = (startIndex, endIndex) => {
  const result = Array.from(todos);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  setTodos(result);
};


  const filteredTodos = todos.filter(todo => {
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  if (loading) return <div>loading Todos...</div>;  // ✅ OK here after hooks run

return (
<section className="min-h-screen  font-sans mb-6">
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="container mx-auto px-0 md:px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
            {/* Heading of the Application Start*/}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
                <p className="text-gray-600">Stay organized and get things done</p>
            </div>
            {/* Heading of the Application End*/}

            {/* Input Field* Start */}
              <TodoForm addTodo={addTodo}/>
            
            {/* Filter Start*/}
            <TodoFilter
              filter={filter}
              setFilter={setFilter}
              todos={todos}
            />
       
            {/* List */}
            <TodoList todos={filteredTodos} 
            updateTodo={updateTodo} 
            deleteTodo={deleteTodo} 
            toggleComplete={toggleComplete}
            reorderTodos={reorderTodos}/>

             <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    <i className="ri-lightbulb-line mr-1"></i>
                    Tip: Click on a task to edit it directly
                </p>
            </div>
        </div>
    </div>
</section>
)
}