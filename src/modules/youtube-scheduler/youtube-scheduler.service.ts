import { youtubeApiProxy } from 'src/utils/proxies/youtube-api-proxy';
import { transformTimeString } from 'src/utils/transformTimeString';
import { VideoDuration } from './interfaces/video-duration.interface';

export class YoutubeSchedulerService {
  async getVideoDurations(searchTerm: string, maxResults: number) {
    const videoDurations: VideoDuration[] = [];
    let pageToken = '';
    let remainingResults = maxResults;

    while (remainingResults > 0) {
      const searchUrl = `search?part=id&q=${searchTerm}&type=video&maxResults=50&pageToken=${pageToken}`;
      const searchResponse = await youtubeApiProxy.get(searchUrl);
      const searchData = searchResponse.data;

      const videoIds = searchData.items.map((item) => item.id.videoId);

      const videoUrl = `videos?part=contentDetails&id=${videoIds.join(',')}`;
      const videoResponse = await youtubeApiProxy.get(videoUrl);
      const videoData = videoResponse.data;

      videoData.items.forEach((item) => {
        videoDurations.push({
          id: item.id,
          duration: transformTimeString(item.contentDetails.duration),
        });
      });

      pageToken = searchData.nextPageToken || '';
      remainingResults -= videoIds.length;
    }

    return videoDurations;
  }
}
