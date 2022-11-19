import {
  connectToDatabase,
  disconnectFromDatabase,
} from '@infra/db/mongodb/helpers/database.service';
import userHandler from '../../pages/api/auth/user';
import getUserIdHandler from '../../pages/api/auth/user/[id]';
import verificationHandler from '../../pages/api/auth/verification';
import { queryClient, testClient } from '../mocks/testClient';

const handler = testClient(userHandler);

let user: {
  username: string;
  _id: string;
  emailAddress: string;
  createdAt: Date;
};

describe('Testing /api/auth/user', () => {
  //ensure database connection
  beforeAll(async () => {
    await connectToDatabase();
  });

  //disconnect from the database
  afterAll((done) => {
    disconnectFromDatabase();
    done();
  });

  //create new user
  it('Should POST on /api/auth/user and return a 201 status code | Create New User', async () => {
    const res = await handler.post('/api/auth/user').send({
      username: 'test',
      password: 'test',
      emailAddress: 'luongosteven@gmail.com',
    });
    expect(res._body.user.emailAddress).toEqual('luongosteven@gmail.com');
    expect(res._body.user.username).toEqual('test');
    expect(res.status).toEqual(201);
    user = res._body.user;
  });

  //create email verification
  it('Should POST on /api/auth/verification and return a 200 status code | Create Email Verification', async () => {
    const res = await testClient(verificationHandler).post('/').send({
      emailAddress: user.emailAddress,
      username: user.username,
      _id: user._id,
    });
    expect(res.status).toEqual(201);
  });

  //fetch user by query
  it('Should PUT on /api/auth/user and return a 200 status code | Fetch Users By Query', async () => {
    const res = await handler
      .put('/api/auth/user/id')
      .send({ username: user.username });
    expect(res._body.users[0].emailAddress).toEqual(user.emailAddress);
    expect(res._body.users[0].username).toEqual(user.username);
    expect(res.status).toEqual(200);
  });

  //fetch user by id
  it('Should GET on /api/auth/user/[id] and return a 200 status code | Fetch User By ID', async () => {
    const res = await queryClient(getUserIdHandler, {
      id: user._id,
    }).get('/');
    expect(res._body.user.username).toEqual(user.username);
    expect(res.status).toEqual(200);
  });

  //update user NOT MODIFIED
  it('Should PUT on /api/auth/user/[id] and return a 304 status code | Update User (Not modified)', async () => {
    const res = await queryClient(getUserIdHandler, { id: user._id })
      .put('/')
      .send({
        username: user.username,
      });
    expect(res.status).toEqual(304);
  });

  //update user
  it('Should PUT on /api/auth/user/[id] and return a 200 status code | Update User', async () => {
    const res = await queryClient(getUserIdHandler, { id: user._id })
      .put('/')
      .send({
        username: 'toor',
      });
    expect(res.status).toEqual(200);
  });

  //delete user
  it('Should DELETE /api/auth/user/[id] and return a 202 status code | Delete User', async () => {
    const res = await queryClient(getUserIdHandler, { id: user._id }).delete(
      '/'
    );
    expect(res.status).toEqual(202);
  });
});
