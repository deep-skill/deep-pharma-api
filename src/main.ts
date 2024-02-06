import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
   )

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  });

  await app.listen(process.env.PORT , () => console.log(`Application is running on: ${process.env.PORT}`));
}
bootstrap();
