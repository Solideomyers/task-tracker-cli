import { TaskService } from '../services/taskService';
import { TaskRepository } from '../repository/task.repository';
import { TaskAddDto } from '../models/dtos/task-add.dto';
import { TaskUpdateDto } from '../models/dtos/task-update.dto';
import { TaskError } from '../errors/task.errors';

jest.mock('../repository/task.repository');

describe('TaskService', () => {
  let taskService: TaskService;
  let mockTaskRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockTaskRepository = new TaskRepository() as jest.Mocked<TaskRepository>;

    // Simulation methods
    jest.spyOn(mockTaskRepository, 'getTask').mockReturnValue([]);
    jest
      .spyOn(mockTaskRepository, 'saveTasksToFile')
      .mockImplementation(() => {});

    // Create new instance before each
    taskService = new TaskService();
    (taskService as any).taskRepository = mockTaskRepository;
    (taskService as any).tasks = []; // clean tasks
  });

  describe('addTask', () => {
    it('should add a task successfully', () => {
      const taskAddDto: TaskAddDto = {
        name: 'Test Task',
        description: 'Test Description',
      };

      taskService.addTask(taskAddDto);

      expect(mockTaskRepository.saveTasksToFile).toHaveBeenCalled();
      expect(taskService['tasks'].length).toBe(1);
      expect(taskService['tasks'][0].name).toBe('Test Task');
    });

    it('should throw an error if task data is invalid', () => {
      const taskAddDto: TaskAddDto = {
        name: '',
        description: '',
      };

      expect(() => taskService.addTask(taskAddDto)).toThrow(TaskError);
    });
  });
  it('should delete a task successfully', () => {
    // Arrange
    const taskAddDto: TaskAddDto = {
      name: 'Test Task',
      description: 'Test Description',
    };
    taskService.addTask(taskAddDto);
    const taskId = taskService['tasks'][0].id;

    // Act
    taskService.deleteTask(taskId);

    // Assert
    expect(mockTaskRepository.saveTasksToFile).toHaveBeenCalled();
    expect(taskService['tasks'].length).toBe(0);
  });

  it('should throw an error if task to delete does not exist', () => {
    expect(() => taskService.deleteTask(999)).toThrow(TaskError);
  });

  describe('updateTask', () => {
    it('should update a task successfully', () => {
      // First, add a task to update
      const taskAddDto = {
        name: 'Old Task',
        description: 'Old Description',
      };
      taskService.addTask(taskAddDto as any); // Cast as any to bypass type checking

      // Prepare update data
      const taskUpdateDto: TaskUpdateDto = {
        name: 'Updated Task',
        description: 'Updated Description',
      };

      // Find the task ID (should be 1 if it's the only one)
      const taskId = taskService['tasks'][0].id;

      // Update the task
      taskService.updateTask(taskId, taskUpdateDto);

      // Verify the task was updated
      expect(mockTaskRepository.saveTasksToFile).toHaveBeenCalled();
      const updatedTask = taskService['tasks'].find(
        (task) => task.id === taskId
      );
      expect(updatedTask).toBeDefined();
      expect(updatedTask?.name).toBe('Updated Task');
      expect(updatedTask?.description).toBe('Updated Description');
    });

    it('should throw an error if task update data is invalid', () => {
      // First, add a task to update
      const taskAddDto = {
        name: 'Old Task',
        description: 'Old Description',
      };
      taskService.addTask(taskAddDto as any); // Cast as any to bypass type checking

      // Prepare invalid update data
      const taskUpdateDto: TaskUpdateDto = {
        name: '',
        description: '',
      };

      // Find the task ID (should be 1 if it's the only one)
      const taskId = taskService['tasks'][0].id;

      // Attempt to update the task
      expect(() => taskService.updateTask(taskId, taskUpdateDto)).toThrow(
        TaskError
      );
    });
  });
});
