import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { baseResponse, paginateResponse } from 'src/utils/response.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private SALT_ROUNDS = 10; // rekomendasi 10-12

  async create(data: CreateUserDto) {
    const exists = await this.prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] },
    });
    if (exists)
      throw new BadRequestException('Email atau username sudah dipakai');
    const hashed = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    return this.prisma.user.create({
      data: { ...data, password: hashed, role: data.role as UserRole },
    });
  }
  async findAll() {
    const users = this.prisma.user.findMany();
    return baseResponse(users);
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...data, role: data.role as UserRole },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getPagination(page: number, size: number) {
    const skip = (page - 1) * size;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: size,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return paginateResponse(data, page, size, total);
  }
}
