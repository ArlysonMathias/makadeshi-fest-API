import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

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

  @IsUrl()
  @IsString()
  @ApiProperty({
    description: 'A url da imagem do filme',
    example:
      'https://i.pinimg.com/originals/c8/fc/45/c8fc459217579657b56bd5defdc1ab84.png',
  })
  image: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id da categoria do filme',
    example: '16e49805-3ca8-40bd-9695-9895371e1edy',
  })
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O preço do filme',
    example: '12.90',
  })
  price: number;
}
