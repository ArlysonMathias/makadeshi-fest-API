import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './users.controller';
import { UserService } from './users.service';
@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UsersModule {}
