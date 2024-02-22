import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos';
import { AuthDto } from 'src/dtos/auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}
   
    async signIn(dto: AuthDto): Promise<any> {
      const user = await this.usersService.findOne(dto.email);
      if (user?.password !== dto.password) {
        throw new UnauthorizedException();
      }
      const { password, ...result } = user;
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return result;
    }

    async signUp(dto: CreateUserDto): Promise<any> {
      // TODO: Register user in the database
      console.log('User registered in the database');
    }
  }