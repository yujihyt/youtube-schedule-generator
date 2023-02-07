import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeSchedulerModule } from './modules/youtube-scheduler/youtube-scheduler.module';

@Module({
  imports: [YoutubeSchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
