import { TaskController } from './controllers/taskController';

const [, , command, ...args] = process.argv;

TaskController.handleCommand(command, args);
