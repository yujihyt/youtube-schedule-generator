import { youtubeApiProxy } from 'src/utils/proxies/youtube-api-proxy';
import { transformTimeString } from 'src/utils/transformTimeString';
import { VideoDuration } from './interfaces/video-duration.interface';

export class YoutubeSchedulerService {
  async getVideoDurations(searchTerm: string, maxResults: number) {
    const videoDurations: VideoDuration[] = [];
    let pageToken = '';
    let remainingResults = maxResults ?? 100;

    while (remainingResults > 0) {
      const searchUrl = `search?part=id&q=${searchTerm}&pageToken=${pageToken}&type=video&maxResults=50`;
      const { data: responseData } = await youtubeApiProxy.get(searchUrl);

      const videoIds = responseData.items.map((item) => item.id.videoId);

      const videoUrl = `videos?part=contentDetails&id=${videoIds.join(',')}`;
      const { data: videoData } = await youtubeApiProxy.get(videoUrl);

      videoData.items.forEach((item) => {
        videoDurations.push({
          id: item.id,
          duration: transformTimeString(item.contentDetails.duration),
        });
      });

      pageToken = responseData.nextPageToken || '';
      remainingResults -= videoIds.length;
    }

    return videoDurations;
  }
}
