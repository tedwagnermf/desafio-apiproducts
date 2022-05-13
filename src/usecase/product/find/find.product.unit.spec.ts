import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("id", "name", 1);

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
}

describe("Test find product use case", () => {
    it("Should find a product", async () => {
        const productRepository = mockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "id"
        }

        const output = {
            id: "id",
            name: "name",
            price: 1,
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("Should not found a product", async () => {
        const productRepository = mockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        });
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "id"
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found")
    });
});