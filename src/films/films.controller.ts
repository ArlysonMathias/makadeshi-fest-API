import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Film } from './entities/film.entity';
import { FavoriteFilmDto } from '../favorities/dto/favorite-film-dto';
import { Favorite } from 'src/favorities/entity/favorite.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('films')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um filme',
  })
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os filmes',
  })
  findAll(): Promise<Film[]> {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar filme por ID',
  })
  findOne(@Param('id') id: string): Promise<Film> {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um filme por ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ): Promise<Film> {
    return this.filmsService.update(id, updateFilmDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um filme',
  })
  delete(@Param('id') id: string) {
    return this.filmsService.delete(id);
  }

  //  Rota de favoritos

  @Post('/favorite')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Favoritar produto',
  })
  favorite(@Body() dto: FavoriteFilmDto): Promise<Favorite> {
    return this.filmsService.favorite(dto);
  }

  @Get(':id/users-liked')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Pesquisar usuários que favoritaram este filme',
  })
  findUsersLiked(@Param('id') id: string) {
    return this.filmsService.findUsersLiked(id);
  }

  @Delete('favorite/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Desfavoritar um filme',
  })
  disfavor(@Param('id') id: string) {
    return this.filmsService.disfavor(id);
  }
}
