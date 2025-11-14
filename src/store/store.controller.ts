import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import {
  CREATED,
  DELETED,
  UPDATED,
} from 'src/common/constant/operations.constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: memoryStorage(),
    }),
  )
  async created(
    @Body() dto: CreateStoreDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      dto.logoUrl = `/uploads/logos/${file.filename}`; // set path ke dto
    }
    // generate nama file
    const filename = `${uuidv4()}${extname(file.originalname)}`;
    const savePath = `./uploads/logos/${filename}`;
    fs.writeFileSync(savePath, file.buffer);

    // set ke dto
    dto.logoUrl = `/uploads/logos/${filename}`;

    await this.storeService.create(dto);
    return CREATED;
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
    return UPDATED;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.storeService.remove(id);
    return DELETED;
  }
}
