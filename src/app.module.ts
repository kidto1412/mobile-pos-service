import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { StoreModule } from './store/store.module';

@Module({
  imports: [PrismaModule, UsersModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
