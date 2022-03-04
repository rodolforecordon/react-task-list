import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './TaskList.css';

export default function TaskList({ handleEdit, handleDelete, tasks }) {
  return (
    <ul className="tarefas">
      {tasks?.map(task => (
        <li key={task.id}>
          {task.title}
          <span>
            <FaPen
              onClick={(e) => handleEdit(e, task.id)}
              className="edit"
            />
            <FaTrash
              onClick={(e) => handleDelete(e, task.id)}
              className="delete"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

// Checking types
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
