import { createServer, RequestListener } from 'http';
import { NextApiHandler } from 'next';
import { apiResolver } from 'next/dist/server/api-utils';
import request from 'supertest';

export const testClient = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) => {
    return apiResolver(
      req,
      res,
      { name: 'john' },
      handler,
      {
        previewModeEncryptionKey: '',
        previewModeId: '',
        previewModeSigningKey: '',
      },
      false
    );
  };

  return request(createServer(listener));
};

export const queryClient = (handler: NextApiHandler, query: object) => {
  const listener: RequestListener = (req, res) => {
    return apiResolver(
      req,
      res,
      query,
      handler,
      {
        previewModeEncryptionKey: '',
        previewModeId: '',
        previewModeSigningKey: '',
      },
      false
    );
  };

  return request(createServer(listener));
};
