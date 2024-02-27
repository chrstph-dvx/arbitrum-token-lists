import React, { useEffect, useState } from 'react';

const TaskSearch = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoadingRenamed] = useState(true);
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
        setTasks(data);
        setLoadingRenamed(false);
      })
      .catch(error => {
        setError(error.message);
        setLoadingRenamed(false);
      });
  }, [searchQuery]); // Depend on searchQuery

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Task Search</h2>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskSearch;