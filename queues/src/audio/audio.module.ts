import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { AudioEvents } from './audio.events';

@Module({
  imports: [BullModule.registerQueue({ name: 'audio' })],
  controllers: [AudioController],
  providers: [AudioService, AudioEvents],
})
export class AudioModule {}
