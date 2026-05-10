import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.type';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  createTask(dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description ?? '',
      priority: dto.priority,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, dto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.priority !== undefined) task.priority = dto.priority;

    return task;
  }

  deleteTask(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(index, 1);
  }
}
