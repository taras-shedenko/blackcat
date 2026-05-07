import {
  QueueEventsListener,
  QueueEventsHost,
  OnQueueEvent,
} from '@nestjs/bullmq';
import { Job } from 'bullmq';

@QueueEventsListener('audio')
export class AudioEvents extends QueueEventsHost {
  @OnQueueEvent('active')
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }
}
