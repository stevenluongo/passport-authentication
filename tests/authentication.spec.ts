import passport from "passport";
import request from "supertest";
import { disconnectFromDatabase } from "../lib/infra/db/mongodb/helpers/database.service";
import { localStrategy } from "../lib/strategies/local";
import loginHandler from "../pages/api/auth/login";
import { testClient } from "./mocks/testClient";

const request = testClient(loginHandler);

describe("Test Authentication API", () => {
  beforeAll(async () => {
    passport.initialize();
    passport.use(localStrategy);
  });

  afterAll((done) => {
    disconnectFromDatabase();
    done();
  });

  it("should fetch /api/auth/login and return a 200 status code", async () => {
    const res = await request
      .post("/user")
      .send({ username: "toor", password: "toor" });
    expect(res.status).toEqual(200);
  });
});
