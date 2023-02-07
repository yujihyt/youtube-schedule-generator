import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeSchedulerService } from './youtube-scheduler.service';

type Opts = {
  searchTerm: string;
  limit: number;
};

@Controller('youtube-scheduler')
export class YoutubeSchedulerController {
  constructor(
    private readonly youtubeSchedulerService: YoutubeSchedulerService,
  ) {}

  @Get('search')
  search(@Query() opts: Opts) {
    return this.youtubeSchedulerService.getVideoDurations(
      opts.searchTerm,
      opts.limit,
    );
  }
}
