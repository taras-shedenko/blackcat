import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathController } from './math.controller';
import { MathService } from './math.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'MATH', transport: Transport.TCP, options: { port: 3001 } },
    ]),
  ],
  controllers: [MathController],
  providers: [MathService],
  exports: [ClientsModule],
})
export class MathModule {}
