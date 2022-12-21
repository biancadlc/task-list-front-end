import React, { useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import {useState} from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];
const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

const convertFromAPI = (apiTask) => {
  const {id, title, description, is_complete} = apiTask;
  //destructure each of the fields coming from the Task
  const newTask = {id, title, description, isComplete: is_complete};
  // use the value of is_complete for the key isComplete
  return newTask;
};

const getAllTasksApi = () =>{
  return axios.get(`${kBaseUrl}/tasks`)// returns a promise you can access outside of this function
    .then(response =>{ 
      return response.data;
    })
    .catch(err => {
    console.log(err);
  });
};

const markTaskCompleteApi = (id, taskStatus) => {
  const markType = () => {
    if (taskStatus){
      return 'mark_complete';
    } else {
      return 'mark_incomplete';
    }
  };
  return axios.patch(`${kBaseUrl}/tasks/${id}/${markType}`)
  .then(response => {
    return response.data;
  })

  .catch(error => {
    console.log(error);
  });
};

const deleteTaskApi = (id) =>{
  return axios.delete( `${kBaseUrl}/${id}`);

};

const App = () => {
  const [taskData, setTaskData] = useState([]);
  //default is empty list
  //after page renders useEffect will execute once hint: look at 2nd parameter

  const getAllTasks = ()=>{
    getAllTasksApi() //returns a promise
    .then((tasks) =>{
      setTaskData(tasks);
    });
  
  }; 

  useEffect(()=>{
    getAllTasks(); //returns a promise from getAllTasksAPI() and setsTaskData

  } ,[]);
  
  

  const updateTask = (id, taskStatus) => {
    setTaskData(taskData => taskData.map(task => {
      if(task.id === id){
  
        return {...task, isComplete: taskStatus};
      } else{
        return task;
      }
    }));
    markTaskCompleteApi(id, taskStatus);

    } ;
  

  const removeTask = (id) => {
    setTaskData(taskData => taskData.filter(task => {
      return task.id != id;
    }));
    deleteTaskApi(id);



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
