import { IsIn, IsOptional, IsString } from 'class-validator';
import type { TaskPriority, TaskStatus } from '../task.type';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(['low', 'medium', 'high'])
  @IsOptional()
  priority?: TaskPriority;

  @IsIn(['todo', 'in_progress', 'done'])
  @IsOptional()
  status?: TaskStatus;
}
