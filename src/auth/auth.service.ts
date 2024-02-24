import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.user({ email: email });
    if (user) {
      const isCorrect = await argon.verify(user?.hash, pass);
      return user || null;
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto): Promise<User> {
    const hash = await argon.hash(dto.password);

    const prismaDto: Prisma.UserCreateInput = {
      email: dto.email,
      fullName: dto.fullName,
      hash: hash
    }

    return await this.usersService.createUser(prismaDto);
  }
}
