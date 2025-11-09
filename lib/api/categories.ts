import { apiClient } from './client';
import { Category } from '@/lib/types/category';

// Use Next.js API routes as proxy to avoid CORS issues
const BASE_URL = '/api';

export const categoryApi = {
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>(`${BASE_URL}/categories`);
  },

  /**
   * Get a single category by ID
   */
  async getCategory(id: number): Promise<Category> {
    return apiClient.get<Category>(`${BASE_URL}/categories/${id}`);
  },

  /**
   * Create a new category
   */
  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    return apiClient.post<Category>(`${BASE_URL}/categories`, category);
  },

  /**
   * Update an existing category
   */
  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    return apiClient.put<Category>(`${BASE_URL}/categories/${id}`, category);
  },

  /**
   * Delete a category
   */
  async deleteCategory(id: number): Promise<void> {
    return apiClient.delete(`${BASE_URL}/categories/${id}`);
  },
};
