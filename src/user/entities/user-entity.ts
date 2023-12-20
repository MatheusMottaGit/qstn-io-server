import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { User } from 'src/user/dtos/user-attributes';
import { UsersRepository } from 'src/user/repositories/users-repository';
import { z } from 'zod';
import { UserAuthRequest } from '../dtos/user-auth-request';

@Controller()
export class UserController {
  constructor(
    private usersRepository: UsersRepository,
    private jwt: JwtService,
  ) {}

  @Post('register')
  async authenticateUser(@Body() userAuth: UserAuthRequest) {
    const { access_token, role } = userAuth;

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

    user = await this.usersRepository.find(role, userInfo);

    if (!user) {
      user = await this.usersRepository.create(userInfo, role);
    }

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
