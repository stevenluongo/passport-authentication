import {
  collections,
  connectToDatabase,
  disconnectFromDatabase,
} from '@infra/db/mongodb/helpers/database.service';

describe('Database Connection', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll((done) => {
    disconnectFromDatabase();
    done();
  });

  it('Should successfully connect to MongoDB', async () => {
    const { users } = collections;
    expect(users).toBeTruthy();
  });

  it('Should successfully disconnect from MongoDB', async () => {
    await disconnectFromDatabase();
    const { users } = collections;
    expect(users).toBeFalsy();
  });
});
