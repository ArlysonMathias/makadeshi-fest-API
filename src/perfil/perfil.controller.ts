import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Perfil } from './entities/perfil.entity';

@ApiTags('perfil')
@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar perfil',
  })
  create(@Body() createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    return this.perfilService.create(createPerfilDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis',
  })
  findAll(): Promise<Perfil[]> {
    return this.perfilService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar perfil por id',
  })
  findOne(@Param('id') id: string): Promise<Perfil> {
    return this.perfilService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar perfil',
  })
  update(
    @Param('id') id: string,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ): Promise<Perfil> {
    return this.perfilService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar perfil',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.perfilService.delete(id);
  }
}
