import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;

      // TODO: Generate a JWT and return it here
      // instead of the user object
      return result;
    }

    return null;
  }

  async signUp(dto: CreateUserDto): Promise<any> {
    // TODO: Register user in the database
    console.log('User registered in the database');
  }
}