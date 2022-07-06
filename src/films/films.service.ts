import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFilmDto): Promise<Film> {
    try {
      return await this.prisma.film.create({ data: dto });
    } catch (error) {
      return this.handleError(error);
    }
  }

  findAll(): Promise<Film[]> {
    return this.prisma.film.findMany();
  }

  async verifyFilmIdAndReturn(id: string): Promise<Film> {
    const verifyId: Film = await this.prisma.film.findUnique({ where: { id } });
    if (!verifyId) {
      throw new NotFoundException(`Entrada do Id '${id}' não encontrado.`);
    }
    return verifyId;
  }

  async findOne(id: string): Promise<Film> {
    await this.verifyFilmIdAndReturn(id);

    return this.prisma.film.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateFilmDto): Promise<Film> {
    await this.verifyFilmIdAndReturn(id);
    const data: Partial<Film> = { ...dto };

    try {
      return await this.prisma.film.update({
        where: { id },
        data,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string) {
    await this.verifyFilmIdAndReturn(id);

    return this.prisma.film.delete({
      where: { id },
    });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1].trim();

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
