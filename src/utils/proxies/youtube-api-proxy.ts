import axios from 'axios';
import { config } from 'dotenv';

import { handleAxiosError } from '../axios-utils';

const envFile = '.env';

config({ path: envFile });

const { YOUTUBE_API, YOUTUBE_KEY } = process.env;

const youtubeApiProxy = axios.create({
  baseURL: YOUTUBE_API,
  params: {
    key: YOUTUBE_KEY,
  },
});

youtubeApiProxy.interceptors.response.use(
  (response) => response,
  handleAxiosError,
);

export { youtubeApiProxy };
