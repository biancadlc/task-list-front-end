import React, {useState} from 'react';
// import PropTypes from 'prop-types';

const kDefaultFormState = {
  title: '',
  description: ''
  
};

const NewTaskForm = () => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const handleNameChange = (event) => {
    setFormData(event.target.value);

    
    setFormData(kDefaultFormState);


  };

  return (
    <form>
      <div>
        <label htmlFor='title'> Task Title</label> 
        <input type='text' id='title' name='title' onChange={handleNameChange}/>
      </div>
      

      <div>
        <label htmlFor='description'> Task Description</label> 
        <input type='text' id='description' name='description' onChange={handleNameChange}/>
      </div>
      <div> 
        <input type='submit' value='addTask'></input>
      </div>
    </form>);

};

export default NewTaskForm;