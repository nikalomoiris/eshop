# Metrics Dashboard

## Overview

The metrics dashboard provides real-time visibility into business and operational metrics from all microservices. It displays key performance indicators (KPIs) for products, inventory, orders, and reviews.

## Features

- **Real-time Metrics**: Fetches current metrics from all four microservices
- **Auto-refresh**: Automatically refreshes data every 30 seconds
- **Manual Refresh**: Button to manually refresh metrics on demand
- **Visual Indicators**: Color-coded cards to highlight status (green, yellow, red, blue)
- **Responsive Design**: Works on mobile, tablet, and desktop

## Architecture

### Backend Integration

The dashboard connects to Spring Boot Actuator endpoints exposed by each microservice:

- **Product Service** (port 8080): `/actuator/metrics`
- **Order Service** (port 8081): `/actuator/metrics`
- **Review Service** (port 8082): `/actuator/metrics`
- **Inventory Service** (port 8083): `/actuator/metrics`

### Frontend Structure

```
lib/
├── types/metrics.ts          # TypeScript types for metrics data
└── api/metrics.ts           # API client for fetching metrics

components/
└── metrics/
    ├── metric-card.tsx      # Individual metric display card
    └── metric-section.tsx   # Section grouping related metrics

src/app/
└── metrics/
    └── page.tsx             # Main metrics dashboard page
```

## Available Metrics

### Product Service Metrics

- **Total Products**: Number of products in the catalog
- **Categories**: Number of product categories
- **Last Product Added**: Timestamp of the most recently added product

### Inventory Service Metrics

- **Total Stock**: Total quantity across all products
- **Reserved Stock**: Stock currently reserved for pending orders
- **Available Stock**: Calculated as Total Stock - Reserved Stock
- **Products Tracked**: Number of distinct SKUs
- **Low Stock Items**: Products below threshold (< 10 units) - Yellow warning
- **Out of Stock**: Products with zero quantity - Red alert
- **Last Update**: Timestamp of last inventory update

### Order Service Metrics

- **Total Orders**: Total number of orders in the system
- **Last Order Created**: Timestamp of the most recent order

### Review Service Metrics

- **Total Reviews**: Total number of reviews submitted
- **Approved Reviews**: Reviews that have been approved
- **Pending Moderation**: Reviews awaiting moderation - Yellow warning if > 0
- **Last Review Added**: Timestamp of the most recent review

## Color Coding

Metrics use color coding to provide visual status indicators:

- **Blue**: Informational metrics (counts, totals)
- **Green**: Healthy status (no issues, good availability)
- **Yellow**: Warning status (low stock, pending moderation)
- **Red**: Critical status (out of stock)

## Usage

1. **Access the Dashboard**: Navigate to `/metrics` or click "Metrics" in the header
2. **View Metrics**: Metrics are organized by service in separate sections
3. **Refresh Data**: 
   - Automatic: Dashboard refreshes every 30 seconds
   - Manual: Click the "Refresh" button in the top-right

## Error Handling

- If a service is unavailable, the metric will display as `0`
- A console warning is logged for debugging
- If all services fail, an error message with retry button is shown

## Development

### Adding New Metrics

To add a new metric from the backend:

1. **Update Types** (`lib/types/metrics.ts`):
   ```typescript
   export interface ProductMetrics {
     // ... existing metrics
     newMetric: number;
   }
   ```

2. **Fetch the Metric** (`lib/api/metrics.ts`):
   ```typescript
   export async function getProductMetrics(): Promise<ProductMetrics> {
     const [/* existing */, newMetric] = await Promise.all([
       // ... existing fetches
       fetchMetric(PRODUCT_SERVICE_URL, 'new.metric.name'),
     ]);
     
     return {
       // ... existing metrics
       newMetric,
     };
   }
   ```

3. **Display the Metric** (`src/app/metrics/page.tsx`):
   ```typescript
   const productMetrics: MetricDisplay[] = [
     // ... existing metrics
     {
       label: 'New Metric',
       value: metrics.product.newMetric,
       statusColor: 'blue',
     },
   ];
   ```

## Environment Configuration

Ensure `.env.local` has the correct service URLs:

```env
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8080/api
NEXT_PUBLIC_INVENTORY_SERVICE_URL=http://localhost:8083/api
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8081/api
NEXT_PUBLIC_REVIEW_SERVICE_URL=http://localhost:8082/api
```

## Testing

### Prerequisites

1. All backend microservices must be running
2. Spring Boot Actuator endpoints must be enabled in each service

### Manual Testing

1. Start all backend services:
   ```bash
   cd microservices-project
   docker-compose up -d
   ```

2. Start the frontend:
   ```bash
   cd e-shop
   npm run dev
   ```

3. Navigate to http://localhost:3000/metrics

4. Verify:
   - All metrics load successfully
   - Values reflect actual data from backend
   - Auto-refresh works every 30 seconds
   - Manual refresh button works
   - Color coding is correct (low stock = yellow, out of stock = red)

### Testing Individual Services

To test if metrics are available from a specific service:

```bash
# Product Service
curl http://localhost:8080/actuator/metrics/product.count

# Inventory Service
curl http://localhost:8083/actuator/metrics/inventory.total_quantity

# Order Service
curl http://localhost:8081/actuator/metrics/order.count

# Review Service
curl http://localhost:8082/actuator/metrics/review.count
```

## Troubleshooting

### Metrics show as 0

- Verify backend services are running
- Check that Actuator endpoints are exposed in `application.properties`:
  ```properties
  management.endpoints.web.exposure.include=health,info,metrics
  ```
- Check browser console for CORS or network errors

### "Failed to load metrics" error

- Ensure all four backend services are running
- Verify service URLs in `.env.local` are correct
- Check network connectivity to backend services

### Metrics not updating

- Check that auto-refresh is working (console logs)
- Verify timestamp in top-right updates every 30 seconds
- Try manual refresh button
