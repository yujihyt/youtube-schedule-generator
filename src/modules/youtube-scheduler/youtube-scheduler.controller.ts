import { Controller } from '@nestjs/common';
import { YoutubeSchedulerService } from './youtube-scheduler.service';

@Controller('groups')
export class YoutubeSchedulerController {
  constructor(
    private readonly youtubeSchedulerService: YoutubeSchedulerService,
  ) {}
}
