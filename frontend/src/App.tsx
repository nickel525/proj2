import { useState, useEffect } from 'react';
import { getTasks } from './api/tasks';
import type { Task } from './types/task';
import TaskForm from './TaskForm';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError("Could not load tasks");
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  const handleAddTask = (newTask: Task): void => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  return (
    <main>
      <TaskForm onAddTask={handleAddTask} />
      <h1>Tasks</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
            </div>
          ))}
        </div>
      )}    
    </main>
  )
}

export default App;