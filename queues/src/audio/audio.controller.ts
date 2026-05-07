import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add('transcode', { file: 'audio.mp3' });
  }
}
