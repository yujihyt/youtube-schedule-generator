import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleAxiosError = (error) => {
  if (error instanceof HttpException) {
    throw error;
  }
  if (error.response) {
    throw new HttpException(
      {
        status: error.response.status,
        message: `Error attempting to request api "${error.config?.baseURL}"`,
        errorDetail: {
          baseUrl: error.config?.baseURL,
          url: error.config?.url,
          method: error.config?.method,
          params: error.config?.params,
          response: error.response.data,
        },
      },
      error.response.status,
    );
  } else if (error.request) {
    throw new InternalServerErrorException(
      `Error attempting to request api "${error.config?.baseURL}", The request was made but no response was received`,
    );
  } else {
    throw new InternalServerErrorException(
      `Error attempting to request api "${error.config?.baseURL}", Something happened in setting up the request`,
    );
  }
};
