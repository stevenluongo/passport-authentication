import passport from 'passport';
import { disconnectFromDatabase } from '../../lib/infra/db/mongodb/helpers/database.service';
import { localStrategy } from '../../lib/main/strategies/local';
import loginHandler from '../../pages/api/auth/login';
import logoutHandler from '../../pages/api/auth/logout';
import { testClient } from '../mocks/testClient';

const loginRequest = testClient(loginHandler);
const logoutRequest = testClient(logoutHandler);

describe('Test Authentication API', () => {
  beforeEach(async () => {
    passport.initialize();
    passport.use(localStrategy);
  });

  afterAll((done) => {
    disconnectFromDatabase();
    done();
  });

  it('Should POST on /api/auth/login and return a 200 status code | Login', async () => {
    const res = await loginRequest
      .post('/api/auth/login')
      .send({ username: 'toor', password: 'toor' });
    expect(res.status).toEqual(200);
  });

  it('Should POST on /api/auth/login and return a 500 status code | Login Failed', async () => {
    const res = await loginRequest
      .post('/api/auth/login')
      .send({ username: 'toor', password: 'wrong' });
    expect(res.error).toBeTruthy();
    expect(res.status).toEqual(500);
  });

  it('Should fetch on /api/auth/logout and return a 200 status code | Logout', async () => {
    const res = await logoutRequest.get('/api/auth/logout');
    expect(res.status).toEqual(200);
  });
});
