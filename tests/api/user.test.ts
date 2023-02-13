import { UserProps } from '@domain/entities/user';
import {
  connectToDatabase,
  disconnectFromDatabase,
} from '@infra/db/mongodb/helpers/database.service';
import { ResponseProps } from 'tests/infra/interfaces/testClientInterface';
import userHandler from '../../pages/api/auth/user';
import getUserIdHandler from '../../pages/api/auth/user/[id]';
import { queryClient, testClient } from '../mocks/testClient';

const handler = testClient(userHandler);

const testUser = {
  username: 'test',
  password: 'test',
  emailAddress: 'luongosteven@gmail.com',
};

let currentUser: UserProps;

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
    //format request payload
    const payload: UserProps = {
      username: 'test',
      password: 'test',
      emailAddress: 'luongosteven@gmail.com',
    };

    //handle request
    const {
      _body: { error, user },
      status,
    }: ResponseProps = await handler.post('/').send(payload);

    //handle exceptions
    if (error) throw new Error(error);

    //validate response
    expect(user.emailAddress).toEqual(testUser.emailAddress);
    expect(user.username).toEqual(testUser.username);
    expect(status).toEqual(201);

    //assign user
    currentUser = user;
  });

  //fetch user by query
  it('Should PUT on /api/auth/user and return a 200 status code | Fetch Users By Query', async () => {
    //format request payload
    const payload = { username: currentUser.username };

    //handle request
    const {
      _body: { error, users },
      status,
    }: ResponseProps = await handler.put('/').send(payload);

    //handle exceptions
    if (error) throw new Error(error);

    //validate response
    expect(users[0].emailAddress).toEqual(currentUser.emailAddress);
    expect(users[0].username).toEqual(currentUser.username);
    expect(status).toEqual(200);
  });

  //fetch user by id
  it('Should GET on /api/auth/user/[id] and return a 200 status code | Fetch User By ID', async () => {
    //format query
    const query = { _id: currentUser._id };

    //handle request
    const {
      _body: { error, user },
      status,
    }: ResponseProps = await queryClient(getUserIdHandler, query).get('/');

    //handle exceptions
    if (error) throw new Error(error);

    //validate response
    expect(user.emailAddress).toEqual(currentUser.emailAddress);
    expect(user.username).toEqual(currentUser.username);
    expect(status).toEqual(200);
  });

  //update user NOT MODIFIED
  it('Should PUT on /api/auth/user/[id] and return a 304 status code | Update User (Not modified)', async () => {
    //format query
    const query = { _id: currentUser._id };

    //format request payload
    const payload = { username: currentUser.username };

    //handle request
    const { status }: ResponseProps = await queryClient(getUserIdHandler, query)
      .put('/')
      .send(payload);

    //validate response
    expect(status).toEqual(304);
  });

  //update user
  it('Should PUT on /api/auth/user/[id] and return a 200 status code | Update User', async () => {
    //format query
    const query = { _id: currentUser._id };

    //format request payload
    const payload = { username: 'toor' };

    //handle request
    const {
      _body: { error },
      status,
    }: ResponseProps = await queryClient(getUserIdHandler, query)
      .put('/')
      .send(payload);

    //handle exceptions
    if (error) throw new Error(error);

    //validate response
    expect(status).toEqual(200);
  });

  //delete user
  it('Should DELETE /api/auth/user/[id] and return a 202 status code | Delete User', async () => {
    //format query
    const query = { _id: currentUser._id };

    //handle request
    const {
      _body: { error },
      status,
    }: ResponseProps = await queryClient(getUserIdHandler, query).delete('/');

    //handle exceptions
    if (error) throw new Error(error);

    //validate response
    expect(status).toEqual(204);
  });
});

// //create email verification
// it('Should POST on /api/auth/verification and return a 200 status code | Create Email Verification', async () => {
//   const res = await testClient(verificationHandler).post('/').send({
//     emailAddress: user.emailAddress,
//     username: user.username,
//     _id: user._id,
//   });
//   expect(res.status).toEqual(201);
// });
