import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Request() req: any) {
    return this.authService.login(req?.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.register(signUpDto);
  }
}
