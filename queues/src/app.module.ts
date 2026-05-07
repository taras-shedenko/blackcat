import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    BullModule.forRoot({ connection: { host: 'localhost', port: 6379 } }),
    BullModule.registerQueue({ name: 'audio' }),
    AudioModule,
  ],
})
export class AppModule {}
