"use strict";
const { app } = require("../src/server");
const supertest = require("supertest");
const mockServer = supertest(app);
const { db } = require("../src/models/index");


beforeAll(async () => {
    await db.sync();
});

describe("test server", () => {
      it("404 for bad routes", async () => {
        const res = await mockServer.get("/bad");
        expect(res.status).toBe(404);
      });
      it("404 for bad method", async () => {
        const res = await mockServer.delete("/food");
        expect(res.status).toBe(404);
      });
      it("add food", async () => {
        const res = await mockServer.post("/food").send({
          name: "mansaf",
          calories: "50000",
        });
        expect(res.status).toBe(201);
      });
      it ('can get all foods',async()=>{
    let res= await mockServer.get('/food')
    expect(res.status).toBe(200)



      })
    test('can get one food', async () => {
        let res = await mockServer.get('/food/4')

        expect(res.status).toBe(200)

    })

    test('can delete food', async () => {
        let res = await mockServer.put('/food/2')
        expect(res.status).toBe(201)
    })

    test('can update food', async () => {
        let res = await mockServer.delete('/food/1')
        expect(res.status).toBe(204)



    })
});
afterAll(async () => {
    await db.drop();
});