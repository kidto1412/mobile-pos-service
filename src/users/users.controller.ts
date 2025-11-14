import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {
  CREATED,
  DELETED,
  UPDATED,
} from 'src/common/constant/operations.constant';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async created(@Body() dto: CreateUserDto) {
    await this.usersService.create(dto);
    return CREATED;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('pagination')
  async getPagination(@Query('page') page = 1, @Query('size') size = 10) {
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.max(1, Number(size));

    return this.usersService.getPagination(pageNumber, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    await this.usersService.update(id, dto);
    return UPDATED;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return DELETED;
  }
}
