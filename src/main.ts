import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { EnvConfiguration } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // const port = EnvConfiguration().port;
  const port = process.env.PORT;
  await app.listen(port,()=>{
    console.log(`Listening in http://localhost:${port}`)
  });
}
bootstrap();
