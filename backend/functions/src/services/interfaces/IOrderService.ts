import { Order } from '../../repositories/interfaces/IOrderRepository';

export interface IOrderService {
  createOrder(order: Order): Promise<{ orderId: string }>;
  getOrder(orderId: string): Promise<Order>;
  getAllOrders(limit?: number, offset?: number): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: string): Promise<void>;
  validateOrder(order: Order): { valid: boolean; errors: string[] };
}
