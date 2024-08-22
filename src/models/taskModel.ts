export class Task {
  id: number;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  updatedAt: string;

  constructor(
    id: number,
    description: string,
    status: 'todo' | 'in-progress' | 'done',
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
