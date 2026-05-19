export interface Order {
  id: number;
  productId: number;  // só guarda o ID — ainda não busca detalhes
  productName: string; // nome do produto, para facilitar a visualização
  quantity: number;
  total: number; // preço total calculado
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