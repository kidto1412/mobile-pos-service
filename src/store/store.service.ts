import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { baseResponse, paginateResponse } from 'src/utils/response.util';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStoreDto) {
    return this.prisma.store.create({
      data: { ...data },
    });
  }
  async findAll() {
    const stores = this.prisma.store.findMany();
    return baseResponse(stores);
  }
  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store) throw new NotFoundException('User not found');
    return store;
  }
  update(id: string, data: UpdateStoreDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...data },
    });
  }

  remove(id: string) {
    return this.prisma.store.delete({ where: { id } });
  }

  async getPagination(page: number, size: number) {
    const skip = (page - 1) * size;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: size,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.store.count(),
    ]);

    return paginateResponse(data, page, size, total);
  }
}
