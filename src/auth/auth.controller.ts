import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos';
import { AuthDto } from 'src/dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: AuthDto) {
      return this.authService.signIn(signInDto);
    }
 
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signUp(@Body() signUpDto: CreateUserDto) {
      return this.authService.signUp(signUpDto);
    }
  }
