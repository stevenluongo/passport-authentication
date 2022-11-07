import passport from 'passport';
import { disconnectFromDatabase } from '../../lib/infra/db/mongodb/helpers/database.service';
import { localStrategy } from '../../lib/main/strategies/local';
import loginHandler from '../../pages/api/auth/login';
import logoutHandler from "../../pages/api/auth/logout";
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

  it('should fetch /api/auth/login and return a 200 status code', async () => {
    const res = await loginRequest
      .post('/api/auth/login')
      .send({ username: 'toor', password: 'toor' });
    expect(res.status).toEqual(200);
  });

  it('should fetch /api/auth/logout and return a 200 status code', async () => {
    const res = await logoutRequest.get('/api/auth/logout');
    expect(res.status).toEqual(200);
  });
});
