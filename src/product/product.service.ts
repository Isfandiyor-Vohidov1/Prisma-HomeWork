import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          full_name: createProductDto.full_name
        }
      })
      return product;
    } catch (error) {
      throw new HttpException(error, error?.status)
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany({ include: { categories: true } })
      return products;
    } catch (error) {
      throw new HttpException(error, error.message)
    }

  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id }, include: { categories: true } })
      if (!product) {
        throw new NotFoundException(`Product with id->${id} not found`)
      }
      return product
    } catch (error) {
      throw new HttpException(error, error.message)
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: { ...updateProductDto }
      })
      return product;
    } catch (error) {
      throw new HttpException(error, error.message)
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.product.delete({ where: { id } });
      if (!id) {
        throw new NotFoundException('Product with this id not found');
      }
      return { message: 'success' }
    } catch (error) {
      throw new HttpException(error, error.message);
    }
  }
}
