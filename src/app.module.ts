import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { SneakersModule } from './sneakers/sneakers.module';
import { CommonModule } from './common/common.module';
import { SeedsModule } from './seeds/seeds.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.config';



@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema:JoiValidationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB),
    
    SneakersModule,
    
    CommonModule,
    
    SeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
