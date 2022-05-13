import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

      it("should create a product", async () => {
        const response = await request(app)
          .post("/product")
          .send({
            name: "Um",
            price: 1,
          });
    
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Um");
        expect(response.body.price).toBe(1);
      });

      it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
          name: "Um",
        });
        expect(response.status).toBe(500);
      });
    
      it("should list all product", async () => {
        const response = await request(app)
          .post("/product")
          .send({
            name: "John",
            price: 1,
          });
        expect(response.status).toBe(200);
        const response2 = await request(app)
          .post("/product")
          .send({
            name: "Jane",
            price: 2,
          });
        expect(response2.status).toBe(200);
    
        const listResponse = await request(app).get("/product").send();
    
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("John");
        expect(product.price).toBe(1);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Jane");
        expect(product2.price).toBe(2);
      });
});
