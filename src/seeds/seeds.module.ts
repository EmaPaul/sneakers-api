import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { SneakersModule } from 'src/sneakers/sneakers.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports:[SneakersModule]
})
export class SeedsModule {}
