import React, { Component } from 'react';

// Form
import { FaPlus } from 'react-icons/fa';

// Tarefas
import { FaPen, FaTrash } from 'react-icons/fa';

import './Main.css';
import { randomId } from '../modules/randomId';

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    editMode: false,
    editId: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, editMode, editId } = this.state;
    let { newTask } = this.state;

    if (!editMode) {
      newTask = {
        id: randomId(20),
        title: newTask.trim(),
      };

      tasks.push(newTask);

      this.setState({
        tasks: tasks,
        newTask: '',
      });
    } else {
      let newTasks = tasks.map(task => {
        if (task.id === editId) {
          task.title = newTask;
          return task;
        }
        return task;
      });

      this.setState({
        newTask: '',
        tasks: newTasks,
        editMode: false,
        editId: '',
      });
    }

    document.querySelector('input').focus();
  };

  handleInputChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleEdit = (e, id) => {
    const { tasks } = this.state;
    const newTask = tasks.filter(task => task.id === id)[0].title;

    this.setState({
      newTask: newTask,
      editMode: true,
      editId: id,
    });
  };

  handleDelete = (e, id) => {
    const { tasks } = this.state;
    let newTasks = tasks.filter(task => task.id !== id);

    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>Tasks List</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            type="text"
            onChange={this.handleInputChange}
            value={newTask}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tasks.map(task => (
            <li key={task.id}>
              {task.title}
              <span>
                <FaPen
                  onClick={(e) => this.handleEdit(e, task.id)}
                  className="edit"
                />
                <FaTrash
                  onClick={(e) => this.handleDelete(e, task.id)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
