export interface Product {
  id: string | number; // Backend returns number
  name: string;
  description: string;
  price: number;
  sku: string;
  category?: string; // For display purposes
  categoryIds?: number[]; // From backend
  imageUrl?: string; // For display purposes
  imagesIds?: number[]; // From backend
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}
