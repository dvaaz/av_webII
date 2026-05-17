export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}
export interface CreateProduct {
    name: string;
    price: number;
    stock: number;
}
export interface UpdateProductPrice {
    price: number;
}
export interface UpdateProductStock {
    stock: number;
}
export interface ProductRepository {
    create(data: CreateProduct): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    findByUserId(userId: number): Promise<Product[]>;
    update(id: number, data: UpdateProductPrice | UpdateProductStock): Promise<Product>;
    delete(id: number): Promise<Product>;
}
//# sourceMappingURL=product.interface.d.ts.map