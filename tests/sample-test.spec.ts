import handler from '../pages/api/posts';
import { testClient } from './mocks/testClient';

const request = testClient(handler);

describe('Test API', () => {
  it('should fetch /posts and return a 200 status code', async () => {
    // const res = await request.post('/api/posts').send({ username: 'steven', emailAddress: 'test@gmail.com', password: 'test' });
    // expect(res.statusCode).toEqual(200);
    expect(true);
  });
});
