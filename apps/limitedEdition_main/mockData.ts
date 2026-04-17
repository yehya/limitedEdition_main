// Mock Data for MVP
// Products for Limited Edition clothing brand

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'BLACK OVERSIZED HOODIE',
    description: 'Premium heavyweight cotton. Elevated streetwear aesthetic.',
    price: 850,
    image: require('./app/assets/mock_clothing/black_hoodie_keyed.png'),
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'BLACK ESSENTIAL TEE',
    description: 'Classic fit. Premium cotton blend. Essential piece.',
    price: 450,
    image: require('./app/assets/mock_clothing/black_shirt_keyed.png'),
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '3',
    name: 'GRAY OVERSIZED HOODIE',
    description: 'Premium heavyweight cotton. Elevated streetwear aesthetic.',
    price: 850,
    image: require('./app/assets/mock_clothing/gray_hoodie_keyed.png'),
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export const mockCart: CartItem[] = [];

export default mockProducts;
