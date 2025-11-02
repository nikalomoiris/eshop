import { apiClient } from './client';
import { Order, CreateOrderRequest } from '@/lib/types/order';

// Use Next.js API routes as proxy to avoid CORS issues
const BASE_URL = '/api';

export const orderApi = {
  /**
   * Create a new order
   */
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    return apiClient.post<Order>(`${BASE_URL}/orders`, orderData);
  },

  /**
   * Get order by ID
   */
  async getOrder(orderId: string): Promise<Order> {
    return apiClient.get<Order>(`${BASE_URL}/orders/${orderId}`);
  },

  /**
   * Get all orders (for the current user in a real app)
   */
  async getOrders(): Promise<Order[]> {
    return apiClient.get<Order[]>(`${BASE_URL}/orders`);
  },
};
