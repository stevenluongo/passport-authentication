import handler from '../pages/api/posts';
import { testClient } from './mocks/testClient';

const request = testClient(handler);

describe('Test API', () => {
  it('should fetch /posts and return a 200 status code', async () => {
    const res = await request.get('/api/posts');
    expect(res.statusCode).toEqual(200);
  });
});
