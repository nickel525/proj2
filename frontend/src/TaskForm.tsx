import { useState } from 'react';
import { createTask } from './api/tasks';
import type { Task } from './types/task';

interface TaskFormProps {
    onAddTask: (task: Task) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const newTask = await createTask({ title, description});
            onAddTask(newTask);
            setTitle('');
            setDescription('');
        } catch {
            setError("Failed to create task");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h1>Add a new Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Task'}
                </button>
            {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default TaskForm;