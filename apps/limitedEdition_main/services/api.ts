import { httpsCallable, getFunctions } from 'firebase/functions';
import { getFunctions as getFunctionsCompat } from 'firebase/functions';
import { app } from '../config/firebase';

const functions = getFunctions(app);

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private async callFunction<T = any>(
    functionName: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const callable = httpsCallable(functions, functionName);
      const result = await callable(data);
      const response = result.data as ApiResponse<T>;

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.error || 'Unknown error' };
      }
    } catch (error: any) {
      console.error(`Error calling ${functionName}:`, error);
      return {
        success: false,
        error: error.message || 'Failed to call function',
      };
    }
  }

  // Order related functions
  async createOrder(orderData: {
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
  }): Promise<ApiResponse<{ orderId: string }>> {
    return this.callFunction<{ orderId: string }>('createOrder', orderData);
  }

  async getOrder(orderId: string): Promise<ApiResponse<any>> {
    return this.callFunction('getOrder', { orderId });
  }

  // Product related functions
  async getProducts(): Promise<ApiResponse<any[]>> {
    return this.callFunction('getProducts');
  }

  async getProduct(productId: string): Promise<ApiResponse<any>> {
    return this.callFunction('getProduct', { productId });
  }
}

export const apiService = new ApiService();
