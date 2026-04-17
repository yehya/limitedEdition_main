import * as admin from 'firebase-admin';
import { FirestoreOrderRepository } from '../repositories/FirestoreOrderRepository';
import { FirestoreProductRepository } from '../repositories/FirestoreProductRepository';
import { OrderService } from '../services/OrderService';
import { ProductService } from '../services/ProductService';

export class Container {
  private static instance: Container;
  private db: admin.firestore.Firestore;
  private orderService: OrderService;
  private productService: ProductService;

  private constructor() {
    this.db = admin.firestore();
    this.orderService = new OrderService(new FirestoreOrderRepository(this.db));
    this.productService = new ProductService(new FirestoreProductRepository(this.db));
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  getOrderService(): OrderService {
    return this.orderService;
  }

  getProductService(): ProductService {
    return this.productService;
  }

  // For testing purposes - allows injecting mock services
  setOrderService(orderService: OrderService): void {
    this.orderService = orderService;
  }

  setProductService(productService: ProductService): void {
    this.productService = productService;
  }
}
