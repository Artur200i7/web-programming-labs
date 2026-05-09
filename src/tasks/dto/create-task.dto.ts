import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { TaskPriority } from '../task.type';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsIn(['low', 'medium', 'high'])
  priority: TaskPriority;
}
