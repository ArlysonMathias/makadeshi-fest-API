import { Favorite } from 'src/favorities/entity/favorite.entity';

export class User {
  name: string;
  email: string;
  id: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  favorites?: Favorite[];
}
