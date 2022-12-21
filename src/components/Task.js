import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  // const [complete, setComplete] = useState(isComplete);
  // const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

    
  return (
    <li className="tasks__item">
      <button
        className={props.isComplete ? 'tasks__item__toggle--completed' : 'tasks__item__toggle'}
        onClick={() => props.onUpdateTask(props.id, !(props.isComplete))}>
          {props.title}
      </button>
      <button 
        className="tasks__item__remove button"
        onClick={() => props.onRemoveTask(props.id)}>x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired
};

export default Task;
