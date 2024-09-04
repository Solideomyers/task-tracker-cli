import { Status } from './enums/status.enum';

export class Task {
  id: number;
  name: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: number,
    name: string,
    description: string,
    status: Status,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
