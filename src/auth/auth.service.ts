import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { LoginResponseType } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseType> {
    const user = await this.usersService.user({ email: dto.email });
    if (!user) throw new UnauthorizedException();

    const isCorrect = await argon.verify(user?.hash, dto.password);
    if (!isCorrect) throw new UnauthorizedException();

    const payload = { email: user?.email, sub: user?.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
