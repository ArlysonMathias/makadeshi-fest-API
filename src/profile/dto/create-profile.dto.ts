import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
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

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário',
    example: 'a9e92a5f-3829-412c-834a-0deff0159119',
  })
  userID: string;
}
