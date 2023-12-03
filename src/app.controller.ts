import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { User } from '@prisma/client';

interface UserCreateReqBody {
  email: string;
  password: string;
  name?: string;
}

interface UserCreateResBody {
  user: User;
}

@Controller()
export class AppController {
  constructor(
    private readonly service: AppService,
  ) {}

  @Get()
  healthCheck() {
    return this.service.healthCheck();
  }

  @Post('/user')
  async createUser(
    @Body() data: UserCreateReqBody,
  ): Promise<UserCreateResBody> {
    const user = await this.service.create(data);
    return { user };
  }

  @Get('/user/:id')
  async findUser(
    @Param('id') id: string,
  ) {
    const user = await this.service.findOne(id);
    return { user };
  }
}
