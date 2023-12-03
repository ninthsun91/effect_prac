import { BadRequestException, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import type { Prisma, User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    private readonly repo: AppRepository,
  ) {}

  healthCheck() {
    return 'OK';
  }

  async create({ email, name, password }: Partial<Prisma.UserCreateInput>) {
    if (email === undefined || password === undefined) {
      throw new BadRequestException();
    }
    const input = {
      email,
      password,
      name: name ?? email,
    } satisfies Prisma.UserCreateInput;
    return this.repo.create(input);
  }

  async findOne(id: User['id'] | string) {
    const userId = Number(id);
    if (userId) {
      throw new BadRequestException();
    }
    return this.repo.findOne(userId);
  }
}
