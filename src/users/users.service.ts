import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { handleError } from 'src/utils/handle-error-unique-util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(dto.password, 8);

    const data: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      return handleError(error);
    }
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async verifyIdAndReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Entrada do Id '${id}' não encontrado.`);
    }

    return user;
  }

  async findOne(id: string): Promise<User> {
    return this.verifyIdAndReturnUser(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.verifyIdAndReturnUser(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      return handleError(error);
    }
  }

  async delete(id: string) {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
