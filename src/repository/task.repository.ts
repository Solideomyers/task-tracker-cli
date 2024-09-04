import * as fs from 'fs';
import * as path from 'path';
import { Task } from '../models/taskModel';

export class TaskRepository {
  private filePath: string = path.join(__dirname, '../..//tasks.json');
  //   private tasks: Task[] = [];

  constructor() {
    this.initializeTasks();
  }

  private initializeTasks() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  public getTask(): Task[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log('Error reading or parsing tasks.json', error);
      return [];
    }
  }

  public saveTasksToFile(tasks: Task[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
  }
}
