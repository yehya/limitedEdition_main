export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  createdAt?: any;
  updatedAt?: any;
}

export interface IProductRepository {
  create(product: Product): Promise<string>;
  findById(productId: string): Promise<Product | null>;
  findAll(limit?: number, offset?: number): Promise<Product[]>;
  update(productId: string, product: Partial<Product>): Promise<void>;
  delete(productId: string): Promise<void>;
}
