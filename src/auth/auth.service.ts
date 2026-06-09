import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface RegisterDto {
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create(dto.email, hashedPassword);

    const { password, ...rest } = user;
    return rest;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const invalidMsg = 'Invalid credentials';

    if (!user) {
      throw new UnauthorizedException(invalidMsg);
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException(invalidMsg);
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
