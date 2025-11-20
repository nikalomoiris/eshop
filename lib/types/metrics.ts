// Metric value response from Spring Boot Actuator
export interface MetricValue {
  name: string;
  description?: string;
  baseUnit?: string;
  measurements: Array<{
    statistic: string;
    value: number;
  }>;
  availableTags?: Array<{
    tag: string;
    values: string[];
  }>;
}

// Product Service Metrics
export interface ProductMetrics {
  productCount: number;
  categoryCount: number;
  lastProductAddedTimestamp: number;
}

// Inventory Service Metrics
export interface InventoryMetrics {
  totalQuantity: number;
  reservedQuantity: number;
  lowStockCount: number;
  productCount: number;
  outOfStockCount: number;
  lastUpdateTimestamp: number;
}

// Order Service Metrics
export interface OrderMetrics {
  orderCount: number;
  lastOrderCreatedTimestamp: number;
}

// Review Service Metrics
export interface ReviewMetrics {
  reviewCount: number;
  approvedCount: number;
  forModerationCount: number;
  lastReviewAddedTimestamp: number;
}

// Combined metrics dashboard data
export interface MetricsDashboard {
  product: ProductMetrics;
  inventory: InventoryMetrics;
  order: OrderMetrics;
  review: ReviewMetrics;
  lastUpdated: Date;
}

// Metric display configuration
export interface MetricDisplay {
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  statusColor?: 'green' | 'yellow' | 'red' | 'blue';
}
