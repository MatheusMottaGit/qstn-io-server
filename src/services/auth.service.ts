import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async verifyToken(token: string) {
    try {
      return this.jwt.verify(token);
    } catch (error) {
      throw new Error('Invalid token.');
    }
  }
}
