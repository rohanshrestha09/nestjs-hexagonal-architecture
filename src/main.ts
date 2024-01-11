import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './frameworks/primary/filters/exception.filter';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('Nestjs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/api-docs', app, document);

  await app.listen(5000);
}

bootstrap();
