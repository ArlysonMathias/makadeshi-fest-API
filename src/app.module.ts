import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilmsModule } from './films/films.module';
import { CategoriesModule } from './categories/categories.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    FilmsModule,
    CategoriesModule,
    ProfileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
