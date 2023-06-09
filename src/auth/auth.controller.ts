import { Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import core from '@nestia/core'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstname: string
  lastname: string
  username: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @core.TypedRoute.Post('login')
  public login(@core.TypedBody() body: LoginData): LoginData {
    return body
  }

  @core.TypedRoute.Post('register')
  public register(@core.TypedBody() body: RegisterData): RegisterData {
    return body
  }

  @core.TypedRoute.Get('user')
  public user() {
    return {}
  }

  @core.TypedRoute.Get('test')
  public test(): object {
    return {}
  }
}
