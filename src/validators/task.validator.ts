import * as joi from 'joi';
import { TaskAddDto } from '../models/dtos/task-add.dto';
import { TaskUpdateDto } from '../models/dtos/task-update.dto';

export const taskAddSchema = joi.object<TaskAddDto>({
  name: joi.string().required().messages({
    'string.empty': 'Task name is required.',
  }),
  description: joi.string().required().messages({
    'string.empty': 'Task description is required.',
  }),
});

export const taskUpdateSchema = joi.object<TaskUpdateDto>({
  name: joi.string().optional(),
  description: joi.string().optional(),
});
