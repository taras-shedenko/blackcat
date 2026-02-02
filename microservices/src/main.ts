import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<TcpOptions>({
    transport: Transport.TCP,
    options: { port: 3001, retryAttempts: 5, retryDelay: 3000 },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`Application is running on ${await app.getUrl()}`);
}
bootstrap();