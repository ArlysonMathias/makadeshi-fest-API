import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/users.entities';
import { handleError } from 'src/utils/handle-error-unique-util';
import { CreateFilmDto } from './dto/create-film.dto';
import { FavoriteFilmDto } from '../favorities/dto/favorite-film-dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { Favorite } from 'src/favorities/entity/favorite.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFilmDto): Promise<Film> {
    try {
      return await this.prisma.film.create({ data: dto });
    } catch (error) {
      return handleError(error);
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
      return handleError(error);
    }
  }

  async delete(id: string) {
    await this.verifyFilmIdAndReturn(id);

    return this.prisma.film.delete({
      where: { id },
    });
  }

  // Favoritos

  // Favoritar
  async favorite(dto: FavoriteFilmDto): Promise<Favorite> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(`Entrada de id ${dto.userId} não encontrado`);
    }

    const film: Film = await this.prisma.film.findUnique({
      where: { name: dto.filmName },
    });

    if (!film) {
      throw new NotFoundException(
        `Filme de nome: ${dto.filmName} não encontrado`,
      );
    }

    return this.prisma.favorite.create({ data: dto });
  }

  // Desfavoritar
  async disfavor(id: string) {
    await this.verifyFilmIdAndReturn(id);

    return this.prisma.favorite.delete({ where: { id } });
  }

  // Listar usuários que gostam do filme
  async findUsersLiked(id: string) {
    const film: Film = await this.verifyFilmIdAndReturn(id);

    return this.prisma.favorite.findMany({
      where: { filmName: film.name },
      select: { user: true },
    });
  }
}
