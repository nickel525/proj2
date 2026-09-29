import type { Task, CreateTaskInput } from "../types/task";

const API_URL = "http://127.0.0.1:8000/api/tasks/";

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    const data: Task[] = await response.json();
    return data;
}

export async function createTask(task: CreateTaskInput): Promise<Task> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    })

    if (!response.ok) {
        throw new Error("Failed to create task");
    }
    const data: Task = await response.json();
    return data;
}