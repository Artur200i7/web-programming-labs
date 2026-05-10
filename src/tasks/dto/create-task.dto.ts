import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { TaskPriority } from '../task.type';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(['low', 'medium', 'high'])
  priority!: TaskPriority;
}
