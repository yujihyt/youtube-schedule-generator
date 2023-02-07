import { Module } from '@nestjs/common';
import { YoutubeSchedulerController } from './youtube-scheduler.controller';
import { YoutubeSchedulerService } from './youtube-scheduler.service';

@Module({
  imports: [],
  controllers: [YoutubeSchedulerController],
  providers: [YoutubeSchedulerService],
  exports: [],
})
export class YoutubeSchedulerModule {}
