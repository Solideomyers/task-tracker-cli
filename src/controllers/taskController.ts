import { TaskService } from '../services/taskService';

export class TaskController {
  static handleCommand(command: string, args: string[]): void {
    switch (command) {
      case 'add':
        TaskService.addTask(args.join(' '));
        break;
      case 'update':
        TaskService.updateTask(parseInt(args[0]), args.slice(1).join(' '));
        break;
      case 'delete':
        TaskService.deleteTask(parseInt(args[0]));
        break;
      case 'mark-in-progress':
        TaskService.markTaskInProgress(parseInt(args[0]));
        break;
      case 'mark-done':
        TaskService.markTaskDone(parseInt(args[0]));
        break;
      case 'list':
        if (args[0]) {
          TaskService.listTasks(args[0] as 'todo' | 'in-progress' | 'done');
        } else {
          TaskService.listTasks();
        }
        break;
      default:
        console.log('Unknown command.');
        break;
    }
  }
}
