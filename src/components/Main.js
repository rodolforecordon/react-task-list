import React, { Component } from 'react';

import Form from './Form';
import TaskList from './TaskList';

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
    console.log(this.state.tasks);
    e.preventDefault();
    const { tasks, editMode, editId } = this.state;
    let { newTask } = this.state;
    if (!editMode) {
      newTask = {
        id: randomId(20),
        title: newTask.trim(),
      };

      this.setState({
        tasks: [...tasks, newTask],
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
        tasks: [...newTasks],
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

  componentDidMount () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    this.setState({ tasks });
  }

  componentDidUpdate (prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>Tasks List</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          newTask={newTask}
        />

        <TaskList
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tasks={tasks}
        />

      </div>
    );
  }
}
