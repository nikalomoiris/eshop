import { apiClient } from './client';
import { InventoryItem, StockInfo, StockStatus } from '@/lib/types/inventory';

// Use Next.js API routes as proxy to avoid CORS issues
const BASE_URL = '/api';

export const inventoryApi = {
  /**
   * Get inventory for a product by SKU
   */
  async getInventoryBySku(sku: string): Promise<InventoryItem> {
    return apiClient.get<InventoryItem>(`${BASE_URL}/inventory/${sku}`);
  },

  /**
   * Get stock status for a product by SKU
   */
  async getStockStatusBySku(sku: string, productId?: string | number): Promise<StockInfo> {
    const inventory = await this.getInventoryBySku(sku);
    const reserved = inventory.reservedQuantity || inventory.reserved || 0;
    const available = inventory.quantity - reserved;
    
    let status: StockStatus;
    if (available <= 0) {
      status = 'out-of-stock';
    } else if (available < 10) {
      status = 'low-stock';
    } else {
      status = 'in-stock';
    }

    return {
      productId: productId?.toString() || sku,
      quantity: available,
      status,
    };
  },

  /**
   * Check stock for multiple products using their SKUs
   * @param products - Array of objects with id and sku
   */
  async checkStockByProducts(products: Array<{ id: string | number; sku: string }>): Promise<Record<string, StockInfo>> {
    const promises = products.map(p => this.getStockStatusBySku(p.sku, p.id));
    const results = await Promise.allSettled(promises);
    
    const stockMap: Record<string, StockInfo> = {};
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        stockMap[products[index].id.toString()] = result.value;
      }
    });
    
    return stockMap;
  },
};
