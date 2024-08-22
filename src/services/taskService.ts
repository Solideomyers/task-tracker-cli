import * as fs from 'fs';
import * as path from 'path';
import { Task } from '../models/taskModel';

const filePath = path.join(__dirname, '../..//tasks.json');

export class TaskService {
  private static currentId = 1;

  private static readTasks(): Task[] {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as Task[];
  }

  private static writeTask(tasks: Task[]): void {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  }

  private static generateId(): number {
    return this.currentId++;
  }

  static addTask(description: string): void {
    const tasks = this.readTasks();
    const newTask = new Task(
      this.generateId(),
      description,
      'todo',
      new Date().toISOString(),
      new Date().toISOString()
    );
    tasks.push(newTask);
    this.writeTask(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
  }

  static updateTask(id: number, description: string): void {
    const tasks = this.readTasks();
    const task = tasks.find((task) => task.id === id);

    if (task) {
      task.description = description;
      task.updatedAt = new Date().toISOString();
      this.writeTask(tasks);
      console.log(`Task updated successfully (ID: ${id})`);
    } else {
      console.log(`Task not found (ID: ${id})`);
    }
  }

  static deleteTask(id: number): void {
    let tasks = this.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      this.writeTask(tasks);
      console.log(`Task deleted successfully (ID: ${id})`);
    } else {
      console.log('Task not found.');
    }
  }

  static listTasks(status?: 'todo' | 'in-progress' | 'done'): void {
    const tasks = this.readTasks();
    let filteredTasks = tasks;

    if (status) {
      filteredTasks = tasks.filter((task) => task.status === status);
    }

    if (filteredTasks.length === 0) {
      console.log('No tasks found.');
    } else {
      filteredTasks.forEach((task) => {
        console.log(
          `ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`
        );
      });
    }
  }

  static markTaskInProgress(id: number): void {
    this.updateTaskStatus(id, 'in-progress');
  }

  static markTaskDone(id: number): void {
    this.updateTaskStatus(id, 'done');
  }

  static updateTaskStatus(
    id: number,
    status: 'todo' | 'in-progress' | 'done'
  ): void {
    const tasks = this.readTasks();
    const task = tasks.find((task) => task.id === id);

    if (task) {
      task.status = status;
      task.updatedAt = new Date().toISOString();
      this.writeTask(tasks);
      console.log('Task status updated successfully.');
    } else {
      console.log('Task not found.');
    }
  }
}
