import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do filme',
    example: 'A era do gelo',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'A descrição do filme',
    example: 'Filme sobre as aventuras de Sid, Diego e Manny',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'A categoria do filme',
    example: 'Aventura',
  })
  category: string;

  @IsUrl()
  @IsString()
  @ApiProperty({
    description: 'A url da imagem do filme',
    example:
      'https://i.pinimg.com/originals/c8/fc/45/c8fc459217579657b56bd5defdc1ab84.png',
  })
  image: string;
}
