import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entities';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token gerado no login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhpYXNAZ21haWwuY90tIiwiaWF0IjoxNjU3OTIxOTgxLCJleHAiOjE2NTgwMDgzODF9.DzSAtDFBmb7j4T0erg4xUTnhseu3kg00BH0Oa-qFbaP',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário que realizou o login',
  })
  user: User;
}
