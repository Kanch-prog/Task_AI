import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your Flask server URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/upload_task`, {
        task: taskInput,
        skill_required: skillInput,
      });
      setTasks([...tasks, response.data]);
      setTaskInput('');
      setSkillInput('');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred.Skill is not assigned to a user. Please update the users.');
      }
      console.error('Error uploading task:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Task Manager</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleTaskSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="task">Task:</label>
          <input
            type="text"
            id="task"
            className="form-control"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="skill">Skill Required:</label>
          <input
            type="text"
            id="skill"
            className="form-control"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Task</button>
      </form>
      <h2>Tasks:</h2>
      <ul className="list-group mb-4">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item">
            <strong>{task.task}</strong> - Assigned to: {task.assigned_to}
          </li>
        ))}
      </ul>
      <h2>Users and Skills:</h2>
      <ul className="list-group">
        {users.map((user, index) => (
          <li key={index} className="list-group-item">
            <strong>{user.user}</strong> - Skill: {user.skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
