export interface Order {
  id?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    selectedSize: string;
    quantity: number;
  }>;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    governorate: string;
  };
  total: number;
  status: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface IOrderRepository {
  create(order: Order): Promise<string>;
  findById(orderId: string): Promise<Order | null>;
  findAll(limit?: number, offset?: number): Promise<Order[]>;
  updateStatus(orderId: string, status: string): Promise<void>;
  delete(orderId: string): Promise<void>;
}
