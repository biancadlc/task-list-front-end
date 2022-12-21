import React, { useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import {useState} from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';


const convertFromApi = (apiTask) => {
  const {id, title, description, is_complete: isComplete} = apiTask;
  //destructure each of the fields coming from the Task
  const newTask = {id, title, description, isComplete};
  // use the value of is_complete for the key isComplete
  return newTask;
};

const getAllTasksApi = () =>{
  return axios.get(`${kBaseUrl}/tasks`)// returns a promise you can access outside of this function
    .then(response =>{ 
      return response.data.map(convertFromApi);
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
  return axios.patch(`${kBaseUrl}/tasks/${id}/${markType()}`)
  .then(response => {
    return convertFromApi(response.data);
  })

  .catch(error => {
    console.log(error);
  });
};

const deleteTaskApi = (id) =>{
  return axios.delete( `${kBaseUrl}/tasks/${id}`)
  .then(response => {
    console.log(response.data);
    return convertFromApi(response.data);


  });

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
          <NewTaskForm/>
          <TaskList tasks={taskData} onUpdateTask={updateTask} onRemoveTask={removeTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
