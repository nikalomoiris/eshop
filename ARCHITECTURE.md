# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     E-Shop Frontend (Next.js)                │
│                     http://localhost:3000                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend Services                        │
├─────────────────────────────────────────────────────────────┤
│  Product Service      │  Inventory Service                   │
│  :8080                │  :8083                              │
│  ├─ /api/products     │  ├─ /api/inventory/{id}            │
│  └─ /api/products/{id}│                                     │
├───────────────────────┼─────────────────────────────────────┤
│  Order Service        │  Review Service                      │
│  :8081                │  :8082                              │
│  ├─ /api/orders       │  ├─ /api/reviews/product/{id}      │
│  └─ /api/orders/{id}  │  └─ /api/reviews                   │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                         User Interface                         │
├───────────────────────────────────────────────────────────────┤
│  Pages (Next.js App Router)                                   │
│  ├─ Home (/)                                                  │
│  ├─ Products (/products)                                      │
│  ├─ Product Detail (/products/[id])                          │
│  ├─ Cart (/cart)                                             │
│  ├─ Checkout (/checkout)                                     │
│  └─ Order Confirmation (/orders/[id])                        │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                      Component Layer                           │
├───────────────────────────────────────────────────────────────┤
│  Feature Components                                           │
│  ├─ Product Components (ProductCard, ProductGrid, etc.)      │
│  ├─ Cart Components (CartItem, CartSummary)                  │
│  └─ Review Components (ReviewCard, ReviewList)               │
│                                                               │
│  Layout Components                                            │
│  ├─ Header (Navigation, Cart Icon)                           │
│  ├─ Footer                                                    │
│  └─ Container                                                 │
│                                                               │
│  UI Components (Reusable)                                     │
│  ├─ Button, Card, Input, Badge                               │
│  └─ Spinner, Alert, Modal, Rating                            │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                     State Management                           │
├───────────────────────────────────────────────────────────────┤
│  Zustand Store                                                │
│  └─ Cart Store (items, total, add, remove, update)           │
│      └─ Persisted to localStorage                            │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                       API Client Layer                         │
├───────────────────────────────────────────────────────────────┤
│  HTTP Client (client.ts)                                      │
│  └─ Error handling, Request/Response interceptors            │
│                                                               │
│  Service APIs                                                 │
│  ├─ productApi (getProducts, getProduct)                     │
│  ├─ inventoryApi (getInventory, checkStock)                  │
│  ├─ orderApi (createOrder, getOrder)                         │
│  └─ reviewApi (getProductReviews)                            │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                     Backend Services                           │
└───────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. Viewing Products

```
User visits /products
       │
       ▼
ProductsPage (page.tsx)
       │
       ├─ useEffect → productApi.getProducts()
       │                      │
       │                      ▼
       │              HTTP GET to :8080/api/products
       │                      │
       ├─ inventoryApi.checkStock()
       │                      │
       │                      ▼
       │              HTTP GET to :8083/api/inventory/{id}
       │
       ▼
ProductGrid → ProductCard (displays each product with stock status)
```

### 2. Adding to Cart

```
User clicks "Add to Cart" on ProductCard
       │
       ▼
ProductCard.handleAddToCart()
       │
       ▼
useCartStore().addItem(product, quantity)
       │
       ├─ Updates Zustand state
       ├─ Calculates new total
       ├─ Updates item count
       └─ Persists to localStorage
       │
       ▼
Header updates cart badge count (reactive)
```

### 3. Placing an Order

```
User submits checkout form
       │
       ▼
CheckoutPage.handleSubmit()
       │
       ▼
orderApi.createOrder(orderData)
       │
       ▼
HTTP POST to :8081/api/orders
       │
       ▼
Backend processes order
       │
       ▼
Response with order ID
       │
       ├─ clearCart() → Zustand store
       └─ router.push('/orders/{id}')
              │
              ▼
       Order Confirmation Page
```

## Component Dependency Graph

```
Pages
  │
  ├─ Layout Components (Header, Footer, Container)
  │
  ├─ Feature Components
  │   │
  │   └─ UI Components
  │       │
  │       └─ Utilities (cn, formatPrice, formatDate)
  │
  └─ State Management
      │
      └─ API Layer
          │
          └─ Backend Services
```

## Technology Stack

```
┌─────────────────────────────────────┐
│         Frontend Stack               │
├─────────────────────────────────────┤
│  Framework: Next.js 16 (App Router) │
│  Language: TypeScript 5             │
│  Styling: Tailwind CSS 3            │
│  State: Zustand 4                   │
│  HTTP: Axios                        │
│  Icons: Lucide React                │
│  Forms: React Hook Form             │
│  Validation: Zod                    │
└─────────────────────────────────────┘
```

## File Organization Pattern

```
Feature-based organization:

components/
  product/          ← Product-related components
    product-card.tsx
    product-grid.tsx
    product-detail.tsx
  cart/            ← Cart-related components
    cart-item.tsx
    cart-summary.tsx
  ui/              ← Reusable UI primitives
    button.tsx
    card.tsx

lib/
  api/             ← API integration per service
    products.ts
    inventory.ts
  types/           ← TypeScript definitions per domain
    product.ts
    cart.ts
```

## State Management Strategy

```
┌─────────────────────────────────────────┐
│            Zustand Cart Store            │
├─────────────────────────────────────────┤
│  State:                                 │
│  ├─ items: CartItem[]                   │
│  ├─ total: number                       │
│  └─ itemCount: number                   │
│                                         │
│  Actions:                               │
│  ├─ addItem(product, quantity)          │
│  ├─ removeItem(productId)               │
│  ├─ updateQuantity(productId, quantity) │
│  ├─ clearCart()                         │
│  └─ getItemQuantity(productId)          │
│                                         │
│  Middleware:                            │
│  └─ persist (localStorage)              │
└─────────────────────────────────────────┘
```

## Routing Structure

```
app/
├─ layout.tsx               → Root layout (Header + Footer)
├─ page.tsx                → Home page
├─ products/
│  ├─ page.tsx             → Product listing
│  └─ [id]/
│     └─ page.tsx          → Product detail (dynamic)
├─ cart/
│  └─ page.tsx             → Shopping cart
├─ checkout/
│  └─ page.tsx             → Checkout form
└─ orders/
   └─ [id]/
      └─ page.tsx          → Order confirmation (dynamic)
```
