import React, { useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import {useState} from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];
const kBaseUrl = 'http://localhost:5000';
const getAllTasksApi = () =>{
  return axios.get(`${kBaseUrl}/tasks`)
    .then(response =>{ return response.data;})
    .catch(err =>{
    console.log(err);
  });
};



const App = () => {
  const [taskData, setTaskData] = useState([]);
  useEffect(()=>{
    getAllTasks();
  } ,[]);
  
  const getAllTasks = ()=>{
    getAllTasksApi()
    .then((tasks) =>{
      setTaskData(tasks);
    });
  
  }; 

  const updateTask = (id) => {
    setTaskData(taskData => taskData.map(task => {
      if(task.id === id){
        return {...task, isComplete: !(task.isComplete)};
      } else{
        return task;
      }
    })); 
  };

  const removeTask = (id) => {
    setTaskData(taskData => taskData.filter(task => {
      return task.id != id;
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={taskData} onUpdateTask={updateTask} onRemoveTask={removeTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
