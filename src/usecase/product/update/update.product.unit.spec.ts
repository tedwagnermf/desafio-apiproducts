import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product(
    "1",
    "Um",
    1,
)

const input = {
    id: product.id,
    name: "Dois",
    price: 2,
};

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    };
};

describe("Unit test for product update use case", () => {
    it("Should update a product", async () => {
        const productRepository = mockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});