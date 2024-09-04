export class TaskError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'TaskError';
    this.code = code;
  }

  getFriendlyMessage(): string {
    return `[${this.code}] ${this.message}`;
  }

  static createNameError(): TaskError {
    return new TaskError(
      'Task name is required. Please provide a name for the task.',
      'TASK_NAME_REQUIRED'
    );
  }

  static createDescriptionError(): TaskError {
    return new TaskError(
      'Task description is required. Please provide a description for the task.',
      'TASK_DESCRIPTION_REQUIRED'
    );
  }

  static createIdError(): TaskError {
    return new TaskError(
      'Task id is required. Please provide an id for the task.',
      'TASK_ID_REQUIRED'
    );
  }

  static createNotFoundError(id: number): TaskError {
    return new TaskError(`Task with id ${id} not found.`, 'TASK_NOT_FOUND');
  }

  static createInvalidStatusError(status: string): TaskError {
    return new TaskError(
      `Task status '${status}' is invalid.`,
      'TASK_INVALID_STATUS'
    );
  }
}
