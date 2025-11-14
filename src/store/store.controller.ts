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
import { StoreService } from './store.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import {
  CREATED,
  DELETED,
  UPDATED,
} from 'src/common/constant/operations.constant';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async created(@Body() dto: CreateStoreDto) {
    await this.storeService.create(dto);
    return { data: CREATED };
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get('pagination')
  async getPagination(@Query('page') page = 1, @Query('size') size = 10) {
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.max(1, Number(size));

    return this.storeService.getPagination(pageNumber, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateStoreDto) {
    await this.storeService.update(id, dto);
    return { data: UPDATED };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.storeService.remove(id);
    return { data: DELETED };
  }
}
