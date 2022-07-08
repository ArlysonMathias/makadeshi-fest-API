import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FavoriteFilmDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que vai favoritar o filme',
    example: 'f3f444cd-99b2-4ba8-a321-cb67ffba8b2e',
  })
  userId: string;
}
