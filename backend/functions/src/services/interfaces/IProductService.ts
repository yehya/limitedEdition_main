import { Product } from '../../repositories/interfaces/IProductRepository';

export interface IProductService {
  createProduct(product: Product): Promise<{ productId: string }>;
  getProduct(productId: string): Promise<Product>;
  getAllProducts(limit?: number, offset?: number): Promise<Product[]>;
  updateProduct(productId: string, product: Partial<Product>): Promise<void>;
  deleteProduct(productId: string): Promise<void>;
  validateProduct(product: Product): { valid: boolean; errors: string[] };
}
