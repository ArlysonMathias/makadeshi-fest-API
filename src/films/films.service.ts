import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFilmDto): Promise<Film> {
    return this.prisma.film.create({ data: dto });
  }

  findAll(): Promise<Film[]> {
    return this.prisma.film.findMany();
  }

  findOne(id: string): Promise<Film> {
    return this.prisma.film.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateFilmDto): Promise<Film> {
    const data: Partial<Film> = { ...dto };
    return this.prisma.film.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.film.delete({
      where: { id },
    });
  }
}
