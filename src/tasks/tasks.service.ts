import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, TaskPriority } from './task.type';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: randomUUID(),
      title: 'Початкова задача 1',
      description: 'Опис першої задачі',
      status: 'todo',
      priority: 'low',
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      title: 'Початкова задача 2',
      description: 'Опис другої задачі',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      title: 'Початкова задача 3',
      description: 'Опис третьої задачі',
      status: 'done',
      priority: 'high',
      createdAt: new Date(),
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  findOne(id: string): Task | null {
    return this.tasks.find((t) => t.id === id) ?? null;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description,
      status: 'todo',
      priority: dto.priority,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id: string, dto: UpdateTaskDto): Task | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.priority !== undefined) task.priority = dto.priority;
    if (dto.status !== undefined) task.status = dto.status;

    return task;
  }

  remove(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}
