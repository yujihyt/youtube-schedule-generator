import { config } from 'dotenv';

const { NODE_ENV } = process.env;

const envFile = `.env.${NODE_ENV}`;

config({ path: envFile });

const REQUIRED_ENV_VARS = [
    'YOUTUBE_API',
];

REQUIRED_ENV_VARS.forEach((envVar) => {
    const val = process.env[envVar];
    if (val === '' || val === null || val === undefined) {
      throw new Error(`Required ENV VAR not set: ${envVar}`);
    }
});

export const youtubeApi = {
    url: process.env.YOUTUBE_API,
};