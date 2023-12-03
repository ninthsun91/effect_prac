import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import type { Prisma, User } from '@prisma/client';

@Injectable()
export class AppRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findOne(id: User['id']) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}