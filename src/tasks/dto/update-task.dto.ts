import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { TaskPriority, TaskStatus } from '../task.type';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: TaskPriority;

  @IsOptional()
  @IsIn(['todo', 'in_progress', 'done'])
  status?: TaskStatus;
}
