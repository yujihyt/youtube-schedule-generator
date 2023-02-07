import axios from 'axios';
import { config } from 'dotenv';

import { handleAxiosError } from '../axios-utils';

const { NODE_ENV } = process.env;

const envFile = `.env.${NODE_ENV}`;

config({ path: envFile });

const { YOUTUBE_API } = process.env;

const youtubeApiProxy = axios.create({
  baseURL: YOUTUBE_API,
});

youtubeApiProxy.interceptors.response.use(
  (response) => response,
  handleAxiosError,
);

export { youtubeApiProxy };
