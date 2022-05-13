import { v4 as uuid } from "uuid";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutInputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutInputCreateProductDto> {
        const productID = uuid();
        const product = new Product(productID, input.name, input.price);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}