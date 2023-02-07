import { youtubeApiProxy } from 'src/utils/proxies/youtube-api-proxy';

export interface VideoDuration {
  id: string;
  duration: string;
}

export class YoutubeSchedulerService {
  async getVideoDurations(searchTerm: string, maxResults: number) {
    const videoDurations: VideoDuration[] = [];
    let pageToken = '';
    let remainingResults = maxResults;

    // Step 1: Repeat the following steps until all results are retrieved
    while (remainingResults > 0) {
      // Step 2: Search for videos
      const searchUrl = `search?part=id&q=${searchTerm}&type=video&maxResults=50&pageToken=${pageToken}`;
      const searchResponse = await youtubeApiProxy.get(searchUrl);
      const searchData = searchResponse.data;

      // Step 3: Extract video IDs from the search results
      const videoIds = searchData.items.map((item) => item.id.videoId);

      // Step 4: Retrieve video details
      const videoUrl = `videos?part=contentDetails&id=${videoIds.join(',')}`;
      const videoResponse = await youtubeApiProxy.get(videoUrl);
      const videoData = videoResponse.data;

      // Step 5: Extract video durations
      videoData.items.forEach((item) => {
        videoDurations.push({
          id: item.id,
          duration: item.contentDetails.duration,
        });
      });

      // Step 6: Update the page token and remaining results
      pageToken = searchData.nextPageToken || '';
      remainingResults -= videoIds.length;
    }

    return videoDurations;
  }
}
