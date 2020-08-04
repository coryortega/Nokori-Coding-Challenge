const request = require("supertest");
const server = require("../../server");

// Test for registering a new user
describe("auth-log-reg", () => {
  describe("/register and /login", () => {
    it("should allow the user to create an account", async () => {
      await request(server)
        .post("/register")
        .send({
          username: "Testing3Account",
          password: "Testing3Password",
        })
        .expect(201);
    });
    it("should not allow the user to create an account due to duplicate username", async () => {
      await request(server)
        .post("/register")
        .send({
          username: "cory",
          password: "cory",
        })
        .expect(409);
    });
    it("should allow the user to signin to account", async () => {
      await request(server)
        .post("/login")
        .send({
          username: "Testing3Account",
          password: "Testing3Password",
        })
        .expect(200);
    });
    it("should not allow the user to signin to account, unauthorized", async () => {
      await request(server)
        .post("/login")
        .send({
          username: "Testing Account",
        })
        .expect(401);
    });
  });
});
