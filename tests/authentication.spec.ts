import passport from "passport";
import { disconnectFromDatabase } from "../lib/infra/db/mongodb/helpers/database.service";
import { localStrategy } from "../lib/strategies/local";
import loginHandler from "../pages/api/auth/login";
import getUserIdHandler from "../pages/api/auth/user/[id]";
import { testClient } from "./mocks/testClient";

const request = testClient(loginHandler);
const request2 = testClient(getUserIdHandler);

describe("Test Authentication API", () => {
  beforeEach(async () => {
    passport.initialize();
    passport.use(localStrategy);
  });

  afterEach((done) => {
    disconnectFromDatabase();
    done();
  });


  it("should fetch /api/auth/login and return a 200 status code", async () => {
    const res = await request
      .post("/api/auth/login")
      .send({ username: "toor", password: "toor" });
    // eslint-disable-next-line no-undef
    expect(res.status).toEqual(200);
  });

  it("should fetch GET /api/auth/user/id and return a 200 status code", async () => {
    const res = await request2
      .post("/api/auth/user/id")
      .send({ id: "63505fb0090934ce102a46db" });
    expect(res.status).toEqual(200);
  });

  it("should fetch PUT /api/auth/user/id and return a 200 status code", async () => {
    const res = await request2
        .put("/api/auth/user/id")
        .send({ id: "63505fb0090934ce102a46db", username: "phteven" });
    expect(res.status).toEqual(200);
  });

  it("should fetch DELETE /api/auth/user/id and return a 202 status code", async () => {
    const res = await request2
        .delete("/api/auth/user/id")
        .send({ id: "63505fb0090934ce102a46db" });
    expect(res.status).toEqual(202);
  });
});
