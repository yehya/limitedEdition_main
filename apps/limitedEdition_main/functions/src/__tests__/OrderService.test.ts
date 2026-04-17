import { OrderService } from '../services/OrderService';
import { IOrderRepository, Order } from '../repositories/interfaces/IOrderRepository';

class MockOrderRepository implements IOrderRepository {
  async create(order: Order): Promise<string> {
    return 'order-123';
  }

  async findById(orderId: string): Promise<Order | null> {
    if (orderId === 'order-123') {
      return {
        id: 'order-123',
        items: [{ id: 'p1', name: 'Test Product', price: 100, selectedSize: 'M', quantity: 2 }],
        customerInfo: {
          name: 'John Doe',
          phone: '01234567890',
          address: '123 Test St',
          city: 'Cairo',
          governorate: 'Cairo',
        },
        total: 200,
        status: 'pending',
      };
    }
    return null;
  }

  async findAll(limit = 50, offset = 0): Promise<Order[]> {
    return [
      {
        id: 'order-123',
        items: [{ id: 'p1', name: 'Test Product', price: 100, selectedSize: 'M', quantity: 2 }],
        customerInfo: {
          name: 'John Doe',
          phone: '01234567890',
          address: '123 Test St',
          city: 'Cairo',
          governorate: 'Cairo',
        },
        total: 200,
        status: 'pending',
      },
    ];
  }

  async updateStatus(orderId: string, status: string): Promise<void> {
    // Mock implementation
  }

  async delete(orderId: string): Promise<void> {
    // Mock implementation
  }
}

describe('OrderService', () => {
  let orderService: OrderService;
  let mockRepository: MockOrderRepository;

  beforeEach(() => {
    mockRepository = new MockOrderRepository();
    orderService = new OrderService(mockRepository);
  });

  describe('createOrder', () => {
    it('should create a valid order successfully', async () => {
      const validOrder: Order = {
        items: [{ id: 'p1', name: 'Test Product', price: 100, selectedSize: 'M', quantity: 2 }],
        customerInfo: {
          name: 'John Doe',
          phone: '01234567890',
          address: '123 Test St',
          city: 'Cairo',
          governorate: 'Cairo',
        },
        total: 200,
        status: 'pending',
      };

      const result = await orderService.createOrder(validOrder);
      expect(result).toEqual({ orderId: 'order-123' });
    });

    it('should throw error for order without items', async () => {
      const invalidOrder: Order = {
        items: [],
        customerInfo: {
          name: 'John Doe',
          phone: '01234567890',
          address: '123 Test St',
          city: 'Cairo',
          governorate: 'Cairo',
        },
        total: 200,
        status: 'pending',
      };

      await expect(orderService.createOrder(invalidOrder)).rejects.toThrow();
    });

    it('should throw error for order without customer name', async () => {
      const invalidOrder: Order = {
        items: [{ id: 'p1', name: 'Test Product', price: 100, selectedSize: 'M', quantity: 2 }],
        customerInfo: {
          name: '',
          phone: '01234567890',
          address: '123 Test St',
          city: 'Cairo',
          governorate: 'Cairo',
        },
        total: 200,
        status: 'pending',
      };

      await expect(orderService.createOrder(invalidOrder)).rejects.toThrow();
    });

    it('should throw error for order with zero total', async () => {
      const invalidOrder: Order = {
        items: [{ id: 'p1', name: 'Test Product', price: 100, selectedSize: 'M', quantity: 2 }],
        customerInfo: {
          name: 'John Doe',
          phone: '01234567890',
          address: '123 Test St',
          city: 'Cairo',
          governorate: 'Cairo',
        },
        total: 0,
        status: 'pending',
      };

      await expect(orderService.createOrder(invalidOrder)).rejects.toThrow();
    });
  });

  describe('getOrder', () => {
    it('should return an existing order', async () => {
      const order = await orderService.getOrder('order-123');
      expect(order).toBeDefined();
      expect(order.id).toBe('order-123');
    });

    it('should throw error for non-existent order', async () => {
      await expect(orderService.getOrder('non-existent')).rejects.toThrow('Order not found');
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status with valid status', async () => {
      await expect(orderService.updateOrderStatus('order-123', 'processing')).resolves.not.toThrow();
    });

    it('should throw error for invalid status', async () => {
      await expect(orderService.updateOrderStatus('order-123', 'invalid')).rejects.toThrow();
    });
  });

  describe('validateOrder', () => {
    it('should return valid for a complete order', () => {
      const validOrder: Order = {
        items: [{ id: 'p1', name: 'Test Product', price: 100, selectedSize: 'M', quantity: 2 }],
        customerInfo: {
          name: 'John Doe',
          phone: '01234567890',
          address: '123 Test St',
          city: 'Cairo',
          governorate: 'Cairo',
        },
        total: 200,
        status: 'pending',
      };

      const result = orderService.validateOrder(validOrder);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return errors for missing fields', () => {
      const invalidOrder: Order = {
        items: [],
        customerInfo: {
          name: '',
          phone: '',
          address: '',
          city: '',
          governorate: '',
        },
        total: 0,
        status: 'pending',
      };

      const result = orderService.validateOrder(invalidOrder);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
