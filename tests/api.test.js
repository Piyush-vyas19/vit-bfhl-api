const request = require("supertest");

const API_URL = "https://vit-bfhl-api.vercel.app";

describe("BFHL API Tests", () => {
  test("Valid request with mix of numbers, alphabets, special characters", async () => {
    const response = await request(API_URL)
      .post("/bfhl")
      .send({ data: ["a", "1", "334", "4", "R", "$"] })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.is_success).toBe(true);
    expect(response.body.sum).toBe("339");
    expect(response.body.odd_numbers).toContain("1");
    expect(response.body.even_numbers).toEqual(
      expect.arrayContaining(["334", "4"])
    );
  });

  test("Valid request with only alphabets", async () => {
    const response = await request(API_URL)
      .post("/bfhl")
      .send({ data: ["A", "b", "c"] });
    expect(response.status).toBe(200);
    expect(response.body.alphabets).toEqual(["A", "B", "C"]);
    expect(response.body.sum).toBe("0");
  });

  test("Valid request with only numbers", async () => {
    const response = await request(API_URL)
      .post("/bfhl")
      .send({ data: ["2", "5", "10"] });
    expect(response.status).toBe(200);
    expect(response.body.even_numbers).toEqual(
      expect.arrayContaining(["2", "10"])
    );
    expect(response.body.odd_numbers).toEqual(["5"]);
    expect(response.body.sum).toBe("17");
  });

  test("Valid request with only special characters", async () => {
    const response = await request(API_URL)
      .post("/bfhl")
      .send({ data: ["@", "#", "$"] });
    expect(response.status).toBe(200);
    expect(response.body.special_characters).toEqual(["@", "#", "$"]);
    expect(response.body.sum).toBe("0");
  });

  test("Invalid request (missing data field)", async () => {
    const response = await request(API_URL)
      .post("/bfhl")
      .send({ wrongKey: [] });
    expect(response.status).toBe(400);
    expect(response.body.is_success).toBe(false);
  });

  test("Invalid request (data not an array)", async () => {
    const response = await request(API_URL)
      .post("/bfhl")
      .send({ data: "notAnArray" });
    expect(response.status).toBe(400);
    expect(response.body.is_success).toBe(false);
  });

  test("Wrong HTTP method (GET not allowed)", async () => {
    const response = await request(API_URL).get("/bfhl");
    expect(response.status).toBe(405);
  });
});
