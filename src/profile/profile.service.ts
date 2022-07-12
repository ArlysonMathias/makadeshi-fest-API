import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/users.entities';
import { handleError } from 'src/utils/handle-error-unique-util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile.create({ data: dto }).catch(handleError);
  }

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async verifyIdAndReturnPerfil(id: string): Promise<Profile> {
    const verifyId: Profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!verifyId) {
      throw new NotFoundException('Id não encontrado');
    }

    return verifyId;
  }

  async findOne(id: string): Promise<Profile> {
    await this.verifyIdAndReturnPerfil(id);

    return this.prisma.profile.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.verifyIdAndReturnPerfil(id);
    const data: Partial<Profile> = { ...dto };

    return this.prisma.profile
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.verifyIdAndReturnPerfil(id);
    return this.prisma.profile.delete({ where: { id } });
  }

  async findUserProfiles(id: string) {
    const user: User = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Entrada de id ${user} não encontrado`);
    }

    return this.prisma.favorite.findMany({
      where: { userId: user.id },
      select: { user: true },
    });
  }
}
