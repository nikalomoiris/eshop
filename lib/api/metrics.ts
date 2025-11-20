import type {
  MetricValue,
  ProductMetrics,
  InventoryMetrics,
  OrderMetrics,
  ReviewMetrics,
  MetricsDashboard,
} from '@/lib/types/metrics';

/**
 * Fetch a single metric value via Next.js API route (server-side proxy to avoid CORS)
 */
async function fetchMetric(service: string, metricName: string): Promise<number> {
  try {
    const response = await fetch(`/api/metrics/${service}/${metricName}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch metric ${metricName} from ${service}: ${response.status}`);
      return 0;
    }

    const data: MetricValue = await response.json();
    
    // Extract the VALUE measurement (Spring Boot Actuator returns measurements array)
    const measurement = data.measurements?.find(m => m.statistic === 'VALUE');
    return measurement?.value ?? 0;
  } catch (error) {
    console.error(`Error fetching metric ${metricName} from ${service}:`, error);
    return 0;
  }
}

/**
 * Fetch all product service metrics
 */
export async function getProductMetrics(): Promise<ProductMetrics> {
  const [productCount, categoryCount, lastProductAddedTimestamp] = await Promise.all([
    fetchMetric('product', 'product.count'),
    fetchMetric('product', 'category.count'),
    fetchMetric('product', 'product.last_added.timestamp'),
  ]);

  return {
    productCount,
    categoryCount,
    lastProductAddedTimestamp,
  };
}

/**
 * Fetch all inventory service metrics
 */
export async function getInventoryMetrics(): Promise<InventoryMetrics> {
  const [
    totalQuantity,
    reservedQuantity,
    lowStockCount,
    productCount,
    outOfStockCount,
    lastUpdateTimestamp,
  ] = await Promise.all([
    fetchMetric('inventory', 'inventory.total_quantity'),
    fetchMetric('inventory', 'inventory.reserved_quantity'),
    fetchMetric('inventory', 'inventory.low_stock.count'),
    fetchMetric('inventory', 'inventory.product.count'),
    fetchMetric('inventory', 'inventory.out_of_stock.count'),
    fetchMetric('inventory', 'inventory.last_update.timestamp'),
  ]);

  return {
    totalQuantity,
    reservedQuantity,
    lowStockCount,
    productCount,
    outOfStockCount,
    lastUpdateTimestamp,
  };
}

/**
 * Fetch all order service metrics
 */
export async function getOrderMetrics(): Promise<OrderMetrics> {
  const [orderCount, lastOrderCreatedTimestamp] = await Promise.all([
    fetchMetric('order', 'order.count'),
    fetchMetric('order', 'order.last_created.timestamp'),
  ]);

  return {
    orderCount,
    lastOrderCreatedTimestamp,
  };
}

/**
 * Fetch all review service metrics
 */
export async function getReviewMetrics(): Promise<ReviewMetrics> {
  const [reviewCount, approvedCount, forModerationCount, lastReviewAddedTimestamp] = await Promise.all([
    fetchMetric('review', 'review.count'),
    fetchMetric('review', 'review.status.approved'),
    fetchMetric('review', 'review.status.for_moderation'),
    fetchMetric('review', 'review.last_added.timestamp'),
  ]);

  return {
    reviewCount,
    approvedCount,
    forModerationCount,
    lastReviewAddedTimestamp,
  };
}

/**
 * Fetch all metrics from all services
 */
export async function getAllMetrics(): Promise<MetricsDashboard> {
  const [product, inventory, order, review] = await Promise.all([
    getProductMetrics(),
    getInventoryMetrics(),
    getOrderMetrics(),
    getReviewMetrics(),
  ]);

  return {
    product,
    inventory,
    order,
    review,
    lastUpdated: new Date(),
  };
}
