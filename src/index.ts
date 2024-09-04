/**
 * Entry point for the Task CLI application
 * Parses command line arguments and invokes TaskController methods
 */

import { TaskController } from './controllers/taskController';

const [, , command, ...args] = process.argv;

if (args.includes('--help')) {
  console.log(`
Usage: task-cli [command]

Commands:
  add <description>         Add a new task
  update <id> <description> Update an existing task
  delete <id>               Delete a task by ID
  list [status]             List all tasks or filter by status (todo, inProgress, done)
  in-progress <id>          Mark a task as in progress
  done <id>                 Mark a task as done
  --help                    Show this help message
  `);
}
const taskController = new TaskController();
taskController.handleCommand(command, args);
