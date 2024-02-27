import React, { useEffect, useState } from 'react';

const TaskAndUserSearch = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoadingRenamed] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoadingRenamed(true);
    fetch(`/search?query=${encodeURIComponent(searchQuery)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data.tasks);
        setUsers(data.users);
        setLoadingRenamed(false);
      })
      .catch(error => {
        setError(error.message);
        setLoadingRenamed(false);
      });
  }, [searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Search Tasks and Users</h2>
      <input
        type="text"
        placeholder="Search tasks and users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h3>Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAndUserSearch;