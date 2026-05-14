export interface Order {
    id: number;
    productId: number;
    quantity: number;
    createdAt: string;
}
export interface CreateOrder {
    productId: number;
    quantity: number;
}
export interface CreateRepository {
    create(data: CreateOrder): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: number): Promise<Order | null>;
    update(id: number, data: Partial<CreateOrder>): Promise<Order | null>;
    delete(id: number): Promise<Order | null>;
}
//# sourceMappingURL=order.interface.d.ts.map