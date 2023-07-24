const request = require("supertest");
const app = require("../src/api/app"); // Update the path to your app.js

describe("GET /", () => {
  it("responds with an HTML page", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/text\/html/);
  });
});

describe("POST /", () => {
  it("should respond with status 200 and 'Email sent successfully'", async () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, this is a test message.",
    };
    const response = await request(app).post("/").send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Email sent successfully");
  });
  it("should respond with status 500 and 'Email sending failed' if the request is invalid", async () => {
    const data = {
      // Invalid data, missing required fields
      name: "John Doe",
      // email and message fields are missing
    };
    const response = await request(app).post("/").send(data);
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Email sending failed");
  });
});
