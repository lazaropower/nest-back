import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: AuthDto) {
      return signInDto;
    }
 
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signUp(@Body() signUpDto: CreateUserDto) {
      return this.authService.signUp(signUpDto);
    }
  }
