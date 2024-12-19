import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter()); 
  app.useLogger(app.get(MyLoggerService));
  app.setGlobalPrefix('/api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
