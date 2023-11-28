import { Module } from '@nestjs/common';
import { UserController } from './entities/user-entity';
import { PrismaService } from 'src/services/prisma.services';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { UsersRepository } from './repositories/users-repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UserModule {}
