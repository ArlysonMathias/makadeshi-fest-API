import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error-unique-util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({ data: dto }).catch(handleError);
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  //Função que faz a verificação se o id passado existe ou não
  async vefifyAndReturnIdCategory(id: string): Promise<Category> {
    const idValidation = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!idValidation) {
      throw new NotFoundException(`Entrada com o id ${id} não encontrado.`);
    }
    return idValidation;
  }

  async findOne(id: string): Promise<Category> {
    return this.vefifyAndReturnIdCategory(id);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    await this.vefifyAndReturnIdCategory(id);
    return this.prisma.category
      .update({ where: { id }, data: dto })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.vefifyAndReturnIdCategory(id);
    return this.prisma.category.delete({
      where: { id },
      select: { name: true },
    });
  }
}
