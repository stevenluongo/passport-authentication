import passport from 'passport';
import { disconnectFromDatabase } from '../../lib/infra/db/mongodb/helpers/database.service';
import { localStrategy } from '../../lib/main/strategies/local';
import userHandler from "../../pages/api/auth/user";
import getUserIdHandler from '../../pages/api/auth/user/[id]';
import { testClient } from '../mocks/testClient';

const handler1 = testClient(userHandler)
const handler = testClient(getUserIdHandler);

describe('Test User API', () => {
  let user : {  username: string, _id: string, emailAddress: string, createdAt: Date };

  beforeEach(async () => {
    passport.initialize();
    passport.use(localStrategy);
  });

  afterEach((done) => {
    disconnectFromDatabase();
    done();
  });

  //create new user
  it('should POST /api/auth/user and return a 200 status code', async () => {
    const res = await handler1
      .post('/api/auth/user/id')
      .send({ username: 'test', password: "test", emailAddress: "test@test.com" });
    expect(res._body.user.emailAddress).toEqual("test@test.com");
    expect(res._body.user.username).toEqual("test");
    expect(res.status).toEqual(200);
    user = res._body.user;
  });

  //fetch user by query
  it('should POST /api/auth/user/id and return a 200 status code', async () => {
    const res = await handler1
        .put('/api/auth/user/id')
        .send({ username: user.username });
    expect(res._body.users[0].emailAddress).toEqual(user.emailAddress);
    expect(res._body.users[0].username).toEqual(user.username);
    expect(res.status).toEqual(200);
  });


  //fetch user by id
  it('should POST /api/auth/user/id and return a 200 status code', async () => {
    const res = await handler
      .post('/api/auth/user/id')
      .send({ id: user._id });
    expect(res._body.user.emailAddress).toEqual(user.emailAddress);
    expect(res._body.user.username).toEqual(user.username);
    expect(res.status).toEqual(200);
  });

  //update user NOT MODIFIED
  it('should PUT /api/auth/user/id and return a 304 status code', async () => {
    const res = await handler
        .put('/api/auth/user/id')
        .send({ id: user._id, username: user.username });
    expect(res.status).toEqual(304);
  });

  //update user
  it('should PUT /api/auth/user/id and return a 200 status code', async () => {
    const res = await handler
      .put('/api/auth/user/id')
      .send({ id: user._id, username: 'toor' });
    expect(res.status).toEqual(200);
  });

  //delete user
  it('should DELETE /api/auth/user/id and return a 202 status code', async () => {
    const res = await handler
      .delete('/api/auth/user/id')
      .send({ id: user._id });
    expect(res.status).toEqual(202);
  });
});
