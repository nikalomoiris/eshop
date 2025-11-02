export interface InventoryItem {
  sku: string;
  quantity: number;
  reservedQuantity?: number;
  reserved?: number; // Alias for backwards compatibility
  available?: number;
  inStock?: boolean;
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface StockInfo {
  productId: string;
  quantity: number;
  status: StockStatus;
}
