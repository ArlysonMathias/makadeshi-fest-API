import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePerfilDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Carlos',
  })
  nickname: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do perfil',
    example: 'https://i.pinimg.com/originals/c8/fc/45/minha-imagem.png',
  })
  image: string;
}
