// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async create(email: string, hashedPassword: string) {
    const user = this.usersRepo.create({ email, password: hashedPassword });
    return this.usersRepo.save(user);
  }

  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
