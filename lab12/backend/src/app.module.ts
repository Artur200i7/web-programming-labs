import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Імпортуй свої модулі тут
// import { TasksModule } from './tasks/tasks.module';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  autoLoadEntities: true,
  synchronize: true,
})


    // Додай свої модулі сюди
    // TasksModule,
    // UsersModule,
  ],
})
export class AppModule {}
