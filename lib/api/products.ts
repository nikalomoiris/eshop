import { apiClient } from './client';
import { Product, ProductListResponse, ProductFilters } from '@/lib/types/product';

// Use Next.js API routes as proxy to avoid CORS issues
const BASE_URL = '/api';

export const productApi = {
  /**
   * Get all products with optional filters
   */
  async getProducts(filters?: ProductFilters & { page?: number; pageSize?: number }): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `${BASE_URL}/products?${queryString}` : `${BASE_URL}/products`;
    
    return apiClient.get<ProductListResponse>(url);
  },

  /**
   * Get a single product by ID
   */
  async getProduct(id: string): Promise<Product> {
    return apiClient.get<Product>(`${BASE_URL}/products/${id}`);
  },

  /**
   * Get product categories
   */
  async getCategories(): Promise<string[]> {
    return apiClient.get<string[]>(`${BASE_URL}/products/categories`);
  },
};
