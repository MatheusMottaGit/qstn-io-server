import { User } from 'src/user/dtos/user-attributes';
import { UsersRepository } from '../users-repository';
import { PrismaService } from 'src/services/prisma.services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(userInfo: User, role: string): Promise<User> {
    if (role === 'student') {
      return await this.prisma.student.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
          role: role,
        },
      });
    }

    if (role === 'teacher') {
      return await this.prisma.teacher.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
          role: role,
        },
      });
    }
  }
  async find(role: string, userInfo: User): Promise<User> {
    if (role === 'student') {
      return await this.prisma.student.findUnique({
        where: {
          googleId: userInfo.id,
        },
      });
    }

    if (role === 'teacher') {
      return await this.prisma.teacher.findUnique({
        where: {
          googleId: userInfo.id,
        },
      });
    }
  }
}
