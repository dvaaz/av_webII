export interface Product{
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface CreateProduct{
    name: string;
    price: number;
    stock: number;
}

export interface UpdateProductPrice{
    price: number;
}

export interface UpdateProductStock{
    stock: number;
}

export interface ProductRepository{
    create(data: CreateProduct): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    findByUserId(userId: string): Promise<Product[]>;
    update(id: string, data: UpdateProductPrice | UpdateProductStock): Promise<Product>;
    delete(id: string): Promise<Product>;
}