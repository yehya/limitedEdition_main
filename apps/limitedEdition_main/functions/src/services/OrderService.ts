import { IOrderRepository, Order } from '../repositories/interfaces/IOrderRepository';
import { IOrderService } from './interfaces/IOrderService';

export class OrderService implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(order: Order): Promise<{ orderId: string }> {
    const validation = this.validateOrder(order);
    if (!validation.valid) {
      throw new Error(`Invalid order: ${validation.errors.join(', ')}`);
    }

    const orderId = await this.orderRepository.create(order);
    return { orderId };
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async getAllOrders(limit = 50, offset = 0): Promise<Order[]> {
    return this.orderRepository.findAll(limit, offset);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    await this.orderRepository.updateStatus(orderId, status);
  }

  validateOrder(order: Order): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!order.items || order.items.length === 0) {
      errors.push('Order must have at least one item');
    }

    if (!order.customerInfo) {
      errors.push('Customer information is required');
    } else {
      if (!order.customerInfo.name || order.customerInfo.name.trim() === '') {
        errors.push('Customer name is required');
      }
      if (!order.customerInfo.phone || order.customerInfo.phone.trim() === '') {
        errors.push('Customer phone is required');
      }
      if (!order.customerInfo.address || order.customerInfo.address.trim() === '') {
        errors.push('Customer address is required');
      }
      if (!order.customerInfo.city || order.customerInfo.city.trim() === '') {
        errors.push('Customer city is required');
      }
      if (!order.customerInfo.governorate || order.customerInfo.governorate.trim() === '') {
        errors.push('Customer governorate is required');
      }
    }

    if (!order.total || order.total <= 0) {
      errors.push('Order total must be greater than 0');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
