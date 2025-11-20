'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/container';
import { MetricCard } from '@/components/metrics/metric-card';
import { MetricSection } from '@/components/metrics/metric-section';
import { Spinner } from '@/components/ui/spinner';
import { getAllMetrics } from '@/lib/api/metrics';
import type { MetricsDashboard, MetricDisplay } from '@/lib/types/metrics';

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<MetricsDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await getAllMetrics();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError('Failed to load metrics. Please ensure all services are running.');
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    console.log('formatTimestamp called with:', timestamp, 'type:', typeof timestamp);
    if (!timestamp || timestamp === 0) return 'Never';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading && !metrics) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchMetrics}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  if (!metrics) return null;

  // Product Metrics
  const productMetrics: MetricDisplay[] = [
    {
      label: 'Total Products',
      value: metrics.product.productCount,
      statusColor: 'blue',
    },
    {
      label: 'Categories',
      value: metrics.product.categoryCount,
      statusColor: 'blue',
    },
    {
      label: 'Last Product Added',
      value: formatTimestamp(metrics.product.lastProductAddedTimestamp),
      statusColor: 'blue',
    },
  ];

  // Inventory Metrics
  const inventoryMetrics: MetricDisplay[] = [
    {
      label: 'Total Stock',
      value: metrics.inventory.totalQuantity,
      unit: 'units',
      statusColor: 'blue',
    },
    {
      label: 'Reserved Stock',
      value: metrics.inventory.reservedQuantity,
      unit: 'units',
      statusColor: 'yellow',
    },
    {
      label: 'Available Stock',
      value: metrics.inventory.totalQuantity - metrics.inventory.reservedQuantity,
      unit: 'units',
      statusColor: 'green',
    },
    {
      label: 'Products Tracked',
      value: metrics.inventory.productCount,
      statusColor: 'blue',
    },
    {
      label: 'Low Stock Items',
      value: metrics.inventory.lowStockCount,
      statusColor: metrics.inventory.lowStockCount > 0 ? 'yellow' : 'green',
    },
    {
      label: 'Out of Stock',
      value: metrics.inventory.outOfStockCount,
      statusColor: metrics.inventory.outOfStockCount > 0 ? 'red' : 'green',
    },
    {
      label: 'Last Update',
      value: formatTimestamp(metrics.inventory.lastUpdateTimestamp),
      statusColor: 'blue',
    },
  ];

  // Order Metrics
  const orderMetrics: MetricDisplay[] = [
    {
      label: 'Total Orders',
      value: metrics.order.orderCount,
      statusColor: 'blue',
    },
    {
      label: 'Last Order Created',
      value: formatTimestamp(metrics.order.lastOrderCreatedTimestamp),
      statusColor: 'blue',
    },
  ];

  // Review Metrics
  const reviewMetrics: MetricDisplay[] = [
    {
      label: 'Total Reviews',
      value: metrics.review.reviewCount,
      statusColor: 'blue',
    },
    {
      label: 'Approved Reviews',
      value: metrics.review.approvedCount,
      statusColor: 'green',
    },
    {
      label: 'Pending Moderation',
      value: metrics.review.forModerationCount,
      statusColor: metrics.review.forModerationCount > 0 ? 'yellow' : 'green',
    },
    {
      label: 'Last Review Added',
      value: formatTimestamp(metrics.review.lastReviewAddedTimestamp),
      statusColor: 'blue',
    },
  ];

  return (
    <Container>
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Business Metrics</h1>
            <p className="text-gray-600 mt-2">
              Real-time metrics from all microservices
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-sm font-medium text-gray-700">
              {metrics.lastUpdated.toLocaleTimeString()}
            </p>
            <button
              onClick={fetchMetrics}
              disabled={loading}
              className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Product Metrics */}
        <MetricSection
          title="Product Service"
          description="Catalog and category metrics"
          icon="📦"
        >
          {productMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </MetricSection>

        {/* Inventory Metrics */}
        <MetricSection
          title="Inventory Service"
          description="Stock levels and availability"
          icon="📊"
        >
          {inventoryMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </MetricSection>

        {/* Order Metrics */}
        <MetricSection
          title="Order Service"
          description="Order processing statistics"
          icon="🛒"
        >
          {orderMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </MetricSection>

        {/* Review Metrics */}
        <MetricSection
          title="Review Service"
          description="Review and moderation stats"
          icon="⭐"
        >
          {reviewMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </MetricSection>
      </div>
    </Container>
  );
}
