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
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Film } from './entities/film.entity';

@ApiTags('films')
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
}
