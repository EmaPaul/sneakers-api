import { Module } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { SneakersController } from './sneakers.controller';
import { SneakerSchema, Sneaker } from './entities/sneaker.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Sneaker.name,
        schema: SneakerSchema
      }
    ])
  ],
  controllers: [SneakersController],
  providers: [SneakersService],
  exports:[MongooseModule]
})
export class SneakersModule {}
