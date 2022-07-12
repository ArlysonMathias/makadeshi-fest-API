import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error-unique-util';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Perfil } from './entities/perfil.entity';

@Injectable()
export class PerfilService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePerfilDto): Promise<Perfil> {
    return this.prisma.perfil.create({ data: dto });
  }

  findAll(): Promise<Perfil[]> {
    return this.prisma.perfil.findMany();
  }

  async verifyIdAndReturnPerfil(id: string): Promise<Perfil> {
    const verifyId: Perfil = await this.prisma.perfil.findUnique({
      where: { id },
    });
    if (!verifyId) {
      throw new NotFoundException('Id não encontrado');
    }

    return verifyId;
  }

  async findOne(id: string): Promise<Perfil> {
    await this.verifyIdAndReturnPerfil(id);

    return this.prisma.perfil.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdatePerfilDto): Promise<Perfil> {
    await this.verifyIdAndReturnPerfil(id);
    const data: Partial<Perfil> = { ...dto };

    return this.prisma.perfil
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.verifyIdAndReturnPerfil(id);
    return this.prisma.perfil.delete({ where: { id } });
  }
}
