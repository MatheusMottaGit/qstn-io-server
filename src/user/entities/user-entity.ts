import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { CreateUsersBodyRequest } from 'src/user/dtos/create-user-request-body';
import { User } from 'src/user/dtos/user-attributes';
import { UsersRepository } from 'src/user/repositories/users-repository';
import { z } from 'zod';

@Controller('auth')
export class UserController {
  constructor(
    private usersRepository: UsersRepository,
    private jwt: JwtService,
  ) {}

  @Post('register')
  async authenticateUser(@Body() createUserDto: CreateUsersBodyRequest) {
    const bodySchema = z.object({
      access_token: z.string(),
      role: z.enum(['student', 'teacher']),
    });

    const { access_token, role } = bodySchema.parse(createUserDto);

    const accessTokenResponse = await axios(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const userSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      picture: z.string(),
    });

    const userInfo = userSchema.parse(accessTokenResponse.data);

    let user: User | null;

    await this.usersRepository.find(role, userInfo);

    await this.usersRepository.create(userInfo, role);

    const token = this.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.picture,
      },
      {
        subject: user.id,
        expiresIn: '7 days',
      },
    );

    return { token };
  }
}
