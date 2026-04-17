import { IProductRepository, Product } from '../repositories/interfaces/IProductRepository';
import { IProductService } from './interfaces/IProductService';

export class ProductService implements IProductService {
  constructor(private productRepository: IProductRepository) {}

  async createProduct(product: Product): Promise<{ productId: string }> {
    const validation = this.validateProduct(product);
    if (!validation.valid) {
      throw new Error(`Invalid product: ${validation.errors.join(', ')}`);
    }

    const productId = await this.productRepository.create(product);
    return { productId };
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getAllProducts(limit = 50, offset = 0): Promise<Product[]> {
    return this.productRepository.findAll(limit, offset);
  }

  async updateProduct(productId: string, product: Partial<Product>): Promise<void> {
    // For updates, only validate fields that are being updated
    if (product.name !== undefined && product.name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }
    if (product.description !== undefined && product.description.trim() === '') {
      throw new Error('Product description cannot be empty');
    }
    if (product.price !== undefined && product.price <= 0) {
      throw new Error('Product price must be greater than 0');
    }
    if (product.image !== undefined && product.image.trim() === '') {
      throw new Error('Product image cannot be empty');
    }
    if (product.sizes !== undefined && product.sizes.length === 0) {
      throw new Error('Product must have at least one size');
    }

    await this.productRepository.update(productId, product);
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(productId);
  }

  validateProduct(product: Product): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!product.name || product.name.trim() === '') {
      errors.push('Product name is required');
    }

    if (!product.description || product.description.trim() === '') {
      errors.push('Product description is required');
    }

    if (!product.price || product.price <= 0) {
      errors.push('Product price must be greater than 0');
    }

    if (!product.image || product.image.trim() === '') {
      errors.push('Product image is required');
    }

    if (!product.sizes || product.sizes.length === 0) {
      errors.push('Product must have at least one size');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
