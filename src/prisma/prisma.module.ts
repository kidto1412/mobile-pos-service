import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// ✅ Best Practice: gunakan @Global() agar PrismaService bisa digunakan di semua module tanpa perlu import manual terus-menerus.

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
