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
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profile } from './entities/profile.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar perfil',
  })
  create(@Body() createPerfilDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createPerfilDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis',
  })
  findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar perfil por id',
  })
  findOne(@Param('id') id: string): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar perfil',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profileService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar perfil',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }

  @Get(':id/user-profiles')
  findUserProfiles(@Param('id') id: string) {
    return this.profileService.findUserProfiles(id);
  }
}
