import * as readline from 'readline';
import { Task } from '../models/taskModel';
import { Status } from '../models/enums/status.enum';
import { TaskAddDto } from '../models/dtos/task-add.dto';
import { TaskUpdateDto } from '../models/dtos/task-update.dto';
import { TaskError } from '../errors/task.errors';
import { taskAddSchema, taskUpdateSchema } from '../validators/task.validator';
import { TaskRepository } from '../repository/task.repository';

/**
 * @class TaskService
 * @description service to handle tasks
 */
export class TaskService {
  private tasks: Task[] = [];
  private taskRepository: TaskRepository;

  /**
   * @constructor
   * @param taskRepository - repository for persistent tasks
   */
  constructor() {
    this.taskRepository = new TaskRepository();
    this.tasks = this.taskRepository.getTask() || [];
  }

  private saveTasksToFile(): void {
    this.taskRepository.saveTasksToFile(this.tasks);
  }

  /**
   * Generate new ID
   * @returns {number}
   */
  private generateId(): number {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;
  }

  /** Add new task
   * @param taskAddDto data for task
   * @throws {TaskError} if data is invalid
   */
  public addTask(taskAddDto: TaskAddDto): void {
    const { error } = taskAddSchema.validate(taskAddDto);
    if (error) {
      throw new TaskError('Invalid task data', error.details[0].message);
    }
    const { description, name } = taskAddDto;

    if (!name) {
      throw TaskError.createNameError();
    }
    if (!description) {
      throw TaskError.createDescriptionError();
    }

    const newTask: Task = {
      id: this.generateId(),
      name: name,
      description: description,
      status: Status.todo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    this.saveTasksToFile();
    console.log(
      `Task added successfully (ID: ${newTask.id}})\n Name: ${name}\n Description: ${description}`
    );
  }

  /** Update task
   * @param id - ID task will update
   * @param updateTaskDto - data updated
   * @throws {TaskError} if data is invalid or fail
   */
  public updateTask(id: number, taskUpdateDto: TaskUpdateDto): void {
    const { error } = taskUpdateSchema.validate(taskUpdateDto);
    if (error) {
      throw new TaskError('Invalid task data', error.details[0].message);
    }

    const { description, name } = taskUpdateDto;

    if (!name || !description) {
      throw TaskError.createIdError();
    }

    const task = this.tasks.find((task) => task.id === id);

    if (task) {
      task.name = name ?? task.name;
      task.description = description ?? task.description;
      task.updatedAt = new Date().toISOString();
      this.saveTasksToFile();
      console.log(`Task updated successfully (ID: ${id})`);
    } else {
      console.log(`Task not found (ID: ${id})`);
    }
  }

  /** Delete task
   *
   * @param id
   * @throws {TaskError} - if task not found
   */
  public deleteTask(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.saveTasksToFile();
      console.log(`Task deleted successfully (ID: ${id})`);
    } else {
      throw TaskError.createNotFoundError(id);
    }
  }

  /**
   *
   * @param status
   */
  public listTasks(status?: Status): void {
    let filteredTasks = this.tasks;

    if (status) {
      filteredTasks = this.tasks.filter((task) => task.status === status);
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

  public markTaskInProgress(id: number): void {
    this.updateTaskStatus(id, Status.inProgress);
  }

  public markTaskDone(id: number): void {
    this.updateTaskStatus(id, Status.done);
  }

  private updateTaskStatus(id: number, status: Status): void {
    const task = this.tasks.find((task) => task.id === id);

    if (task) {
      task.status = status;
      task.updatedAt = new Date().toISOString();
      this.saveTasksToFile();
      console.log('Task status updated successfully.');
    } else {
      console.log('Task not found.');
    }
  }

  public findTask(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw TaskError.createNotFoundError(id);
    }
    console.log(`
      Task:\n 
      - Id: ${id}
      - Description: ${task.description}
      - Status: ${task.status}
      `);
  }

  public deleteAllTasks(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(
      'Are you sure you want to delete all tasks? (yes/no): ',
      (answer) => {
        if (answer.toLowerCase() === 'yes') {
          this.tasks = [];
          this.saveTasksToFile();
          console.log('All tasks deleted.');
        } else {
          console.log('operation canceled');
        }
        rl.close();
      }
    );
  }

  private promptQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  public async promptAddTask(): Promise<void> {
    try {
      const name = await this.promptQuestion('Enter task name: ');
      if (!name) {
        console.log('Task name is required');
        return;
      }

      const description = await this.promptQuestion('Enter task description: ');
      if (!description) {
        console.log('Task description is required');
        return;
      }

      const taskAddDto: TaskAddDto = { name, description };
      this.addTask(taskAddDto);
    } catch (error) {
      console.log('Error adding task:', error);
    }
  }

  public async promptUpdateTask(): Promise<void> {
    try {
      const idInput = await this.promptQuestion(
        'Enter task ID of the task you want to update: '
      );
      const id = parseInt(idInput, 10);
      if (isNaN(id)) {
        console.log('Invalid ID. Please enter a valid number.');
        return;
      }

      const task = this.tasks.find((task) => task.id === id);
      if (!task) {
        console.log(`Task not found (ID: ${id})`);
        return;
      }

      const name = await this.promptQuestion(
        'Enter task name (leave blank to keep current): '
      );
      const description = await this.promptQuestion(
        'Enter new task description (leave blank to keep current): '
      );

      const taskUpdateDto: TaskUpdateDto = {
        name: name || task.name,
        description: description || task.description,
      };

      this.updateTask(id, taskUpdateDto);
    } catch (error) {
      console.log('Error updating task: ', error);
    }
  }
}
