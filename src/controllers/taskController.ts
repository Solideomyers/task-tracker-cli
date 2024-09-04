import { TaskError } from '../errors/task.errors';
import { Status } from '../models/enums/status.enum';
import { TaskService } from '../services/taskService';

/**
 * @class TaskController
 * @description Controller to manage task-related commands
 */
export class TaskController {
  private taskService: TaskService;

  /**
   * @constructor
   * Initializes the TaskServices instance
   */
  constructor() {
    this.taskService = new TaskService();
  }

  /**
   *
   * @param command - The command to execute
   * @param args - Argumentes related to the command
   */
  public handleCommand(command: string, args: string[]): void {
    try {
      switch (command) {
        case 'add':
          this.taskService.promptAddTask();
          break;
        case 'update':
          this.taskService.promptUpdateTask();
          break;
        case 'delete':
          this.taskService.deleteTask(parseInt(args[0]));
          break;
        case 'mark-in-progress':
          this.taskService.markTaskInProgress(parseInt(args[0]));
          break;
        case 'mark-done':
          this.taskService.markTaskDone(parseInt(args[0]));
          break;
        case 'list':
          if (args[0]) {
            this.taskService.listTasks(args[0] as Status);
          } else {
            this.taskService.listTasks();
          }
          break;
        case 'find':
          this.taskService.findTask(parseInt(args[0]));
          break;
        case 'delete-all':
          this.taskService.deleteAllTasks();
          break;
        default:
          console.log('Unknown command.');
          break;
      }
    } catch (error) {
      if (error instanceof TaskError) {
        console.log(error.getFriendlyMessage());
      } else {
        console.error('An unexpected error occurred.');
      }
    }
  }
}
