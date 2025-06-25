import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
          Product: {
            connect: { id: createCategoryDto.productId }
          }
        }
        
      })
      return category
    } catch (error) {
      throw new HttpException(error, error.message)
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.findMany({ include: { products: true } })
      return categories
    } catch (error) {
      throw new HttpException(error, error.message);
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({ where: { id }, include: { Product: true } })
      if (!category) {
        throw new NotFoundException('Category with this id not found');
      }
      return category
    } catch (error) {
      throw new HttpException(error, error.message)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: { ...updateCategoryDto }
      })
      return category;
    } catch (error) {
      throw new HttpException(error, error.message)
    }
  }

  async remove(id: number) {
    try {
    await this.prisma.category.delete({ where: { id } });
    if(!id) {
      throw new NotFoundException('Category with this id not found');
    }
    return { message: 'success'};
    } catch (error) {
      throw new HttpException(error, error.message)
    }
  }
}
