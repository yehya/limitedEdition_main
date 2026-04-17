import { ProductService } from '../services/ProductService';
import { IProductRepository, Product } from '../repositories/interfaces/IProductRepository';

class MockProductRepository implements IProductRepository {
  async create(product: Product): Promise<string> {
    return 'product-123';
  }

  async findById(productId: string): Promise<Product | null> {
    if (productId === 'product-123') {
      return {
        id: 'product-123',
        name: 'Test Hoodie',
        description: 'A test hoodie',
        price: 500,
        image: 'https://example.com/image.jpg',
        sizes: ['S', 'M', 'L'],
      };
    }
    return null;
  }

  async findAll(limit = 50, offset = 0): Promise<Product[]> {
    return [
      {
        id: 'product-123',
        name: 'Test Hoodie',
        description: 'A test hoodie',
        price: 500,
        image: 'https://example.com/image.jpg',
        sizes: ['S', 'M', 'L'],
      },
    ];
  }

  async update(productId: string, product: Partial<Product>): Promise<void> {
    // Mock implementation
  }

  async delete(productId: string): Promise<void> {
    // Mock implementation
  }
}

describe('ProductService', () => {
  let productService: ProductService;
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();
    productService = new ProductService(mockRepository);
  });

  describe('createProduct', () => {
    it('should create a valid product successfully', async () => {
      const validProduct: Product = {
        name: 'Test Hoodie',
        description: 'A test hoodie',
        price: 500,
        image: 'https://example.com/image.jpg',
        sizes: ['S', 'M', 'L'],
      };

      const result = await productService.createProduct(validProduct);
      expect(result).toEqual({ productId: 'product-123' });
    });

    it('should throw error for product without name', async () => {
      const invalidProduct: Product = {
        name: '',
        description: 'A test hoodie',
        price: 500,
        image: 'https://example.com/image.jpg',
        sizes: ['S', 'M', 'L'],
      };

      await expect(productService.createProduct(invalidProduct)).rejects.toThrow();
    });

    it('should throw error for product without description', async () => {
      const invalidProduct: Product = {
        name: 'Test Hoodie',
        description: '',
        price: 500,
        image: 'https://example.com/image.jpg',
        sizes: ['S', 'M', 'L'],
      };

      await expect(productService.createProduct(invalidProduct)).rejects.toThrow();
    });

    it('should throw error for product with zero price', async () => {
      const invalidProduct: Product = {
        name: 'Test Hoodie',
        description: 'A test hoodie',
        price: 0,
        image: 'https://example.com/image.jpg',
        sizes: ['S', 'M', 'L'],
      };

      await expect(productService.createProduct(invalidProduct)).rejects.toThrow();
    });

    it('should throw error for product without image', async () => {
      const invalidProduct: Product = {
        name: 'Test Hoodie',
        description: 'A test hoodie',
        price: 500,
        image: '',
        sizes: ['S', 'M', 'L'],
      };

      await expect(productService.createProduct(invalidProduct)).rejects.toThrow();
    });

    it('should throw error for product without sizes', async () => {
      const invalidProduct: Product = {
        name: 'Test Hoodie',
        description: 'A test hoodie',
        price: 500,
        image: 'https://example.com/image.jpg',
        sizes: [],
      };

      await expect(productService.createProduct(invalidProduct)).rejects.toThrow();
    });
  });

  describe('getProduct', () => {
    it('should return an existing product', async () => {
      const product = await productService.getProduct('product-123');
      expect(product).toBeDefined();
      expect(product.id).toBe('product-123');
    });

    it('should throw error for non-existent product', async () => {
      await expect(productService.getProduct('non-existent')).rejects.toThrow('Product not found');
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const products = await productService.getAllProducts();
      expect(products).toHaveLength(1);
      expect(products[0].id).toBe('product-123');
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const updateData: Partial<Product> = {
        name: 'Updated Hoodie',
        price: 600,
      };

      await expect(productService.updateProduct('product-123', updateData)).resolves.not.toThrow();
    });

    it('should throw error for invalid update data', async () => {
      const invalidData: Partial<Product> = {
        price: -100,
      };

      await expect(productService.updateProduct('product-123', invalidData)).rejects.toThrow();
    });
  });

  describe('deleteProduct', () => {
    it('should delete an existing product', async () => {
      await expect(productService.deleteProduct('product-123')).resolves.not.toThrow();
    });

    it('should throw error for non-existent product', async () => {
      await expect(productService.deleteProduct('non-existent')).rejects.toThrow('Product not found');
    });
  });

  describe('validateProduct', () => {
    it('should return valid for a complete product', () => {
      const validProduct: Product = {
        name: 'Test Hoodie',
        description: 'A test hoodie',
        price: 500,
        image: 'https://example.com/image.jpg',
        sizes: ['S', 'M', 'L'],
      };

      const result = productService.validateProduct(validProduct);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return errors for missing fields', () => {
      const invalidProduct: Product = {
        name: '',
        description: '',
        price: 0,
        image: '',
        sizes: [],
      };

      const result = productService.validateProduct(invalidProduct);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
