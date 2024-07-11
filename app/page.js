"use client"
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && desc.trim()) {
      setTasks([...tasks, { title, desc, completed: false }]);
      setTitle('');
      setDesc('');
    }
  };

  const deleteHandler = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <>
      <h1 className='bg-black text-white p-5 text-3xl text-center'>
        Todo List
      </h1>
      <form onSubmit={submitHandler} className='flex flex-col items-center'>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2 w-2/3'
          placeholder='Enter task title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2 w-2/3'
          placeholder='Enter task description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type='submit'
          className='bg-black text-white px-4 py-2 text-2xl font-bold rounded'
        >
          Add Task
        </button>
      </form>
      <hr className='my-5'/>
      <div className='p-8 bg-slate-200'>
        <ul className='space-y-4'>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg shadow-md ${
                  task.completed ? 'bg-green-100' : 'bg-white'
                }`}
              >
                <div className='flex flex-col w-2/3'>
                  <h5
                    className={`text-xl font-semibold ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </h5>
                  <h6
                    className={`text-lg ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.desc}
                  </h6>
                </div>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => toggleCompletion(index)}
                    className='bg-blue-400 py-2 px-4 rounded font-bold'
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => deleteHandler(index)}
                    className='bg-red-400 py-2 px-4 rounded font-bold'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <h2 className='text-center text-xl'>No tasks yet</h2>
          )}
        </ul>
      </div>
    </>
  );
};

export default Page;
