# E-Shop FrontendThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A modern e-commerce frontend application built with Next.js 14, TypeScript, and Tailwind CSS. This application provides a complete shopping experience with product browsing, cart management, and order placement.## Getting Started



## 🚀 FeaturesFirst, run the development server:



### Core Features```bash

- ✅ Product catalog with grid viewnpm run dev

- ✅ Product detail pages with reviews# or

- ✅ Shopping cart with persistent storageyarn dev

- ✅ Checkout flow with order placement# or

- ✅ Order confirmation and detailspnpm dev

- ✅ Real-time stock availability checking# or

- ✅ Responsive design (mobile, tablet, desktop)bun dev

```

### Technical Features

- **Next.js 14** with App RouterOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **TypeScript** for type safety

- **Tailwind CSS** for stylingYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Zustand** for state management

- **Centralized component library**This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **API client layer** with error handling

- **Persistent cart** using localStorage## Learn More



## 📁 Project StructureTo learn more about Next.js, take a look at the following resources:



```- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

e-shop/- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

├── src/

│   └── app/                    # Next.js App Router pagesYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

│       ├── layout.tsx          # Root layout with Header/Footer

│       ├── page.tsx            # Home page## Deploy on Vercel

│       ├── products/           # Product pages

│       │   ├── page.tsx        # Product listingThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

│       │   └── [id]/page.tsx   # Product detail

│       ├── cart/               # Shopping cartCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

│       │   └── page.tsx
│       ├── checkout/           # Checkout flow
│       │   └── page.tsx
│       └── orders/             # Order management
│           └── [id]/page.tsx   # Order confirmation
├── components/                 # Reusable components
│   ├── ui/                    # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── spinner.tsx
│   │   ├── alert.tsx
│   │   ├── modal.tsx
│   │   └── rating.tsx
│   ├── layout/                # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── container.tsx
│   ├── product/               # Product components
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   └── product-detail.tsx
│   ├── cart/                  # Cart components
│   │   ├── cart-item.tsx
│   │   └── cart-summary.tsx
│   └── review/                # Review components
│       ├── review-card.tsx
│       └── review-list.tsx
├── lib/                       # Utilities & helpers
│   ├── api/                   # API client layer
│   │   ├── client.ts
│   │   ├── products.ts
│   │   ├── inventory.ts
│   │   ├── orders.ts
│   │   └── reviews.ts
│   ├── types/                 # TypeScript types
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   ├── review.ts
│   │   ├── inventory.ts
│   │   └── api.ts
│   └── utils/                 # Helper functions
│       ├── cn.ts
│       └── format.ts
├── store/                     # State management
│   └── cart.ts               # Cart store (Zustand)
└── .env.local                # Environment variables
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend services running (see backend docker-compose)

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   The `.env.local` file is already created with default values:
   ```env
   NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8080/api
   NEXT_PUBLIC_INVENTORY_SERVICE_URL=http://localhost:8083/api
   NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8081/api
   NEXT_PUBLIC_REVIEW_SERVICE_URL=http://localhost:8082/api
   ```

3. **Start the backend services:**
   ```bash
   # In your backend project directory
   docker-compose up -d
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Homepage
- Hero section with call-to-action
- Feature highlights
- Quick navigation to products

### Product Catalog (`/products`)
- Browse all products in a grid layout
- View stock status (In Stock, Low Stock, Out of Stock)
- Click any product to view details

### Product Detail (`/products/[id]`)
- View product information
- Check stock availability
- Adjust quantity and add to cart
- Read customer reviews

### Shopping Cart (`/cart`)
- View all cart items
- Adjust quantities
- Remove items
- View order summary
- Proceed to checkout

### Checkout (`/checkout`)
- Enter shipping information
- Review order summary
- Place order

### Order Confirmation (`/orders/[id]`)
- View order details
- See order status
- Review shipping address
- Continue shopping

## 🔧 Backend API Integration

The application connects to the following backend services:

| Service | Port | Endpoints Used |
|---------|------|----------------|
| Product Service | 8080 | `/api/products`, `/api/products/{id}` |
| Inventory Service | 8083 | `/api/inventory/{productId}` |
| Order Service | 8081 | `/api/orders` |
| Review Service | 8082 | `/api/reviews/product/{productId}` |

## 🎨 Component Library

### Base UI Components
- **Button** - Multiple variants (default, outline, ghost, etc.)
- **Card** - Container with header, content, footer
- **Input** - Form input fields
- **Badge** - Status indicators
- **Spinner** - Loading states
- **Alert** - Success, error, warning messages
- **Modal** - Dialog boxes
- **Rating** - Star rating display

### Feature Components
All product, cart, and review components are built on top of the base UI components for consistency.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔄 State Management

**Zustand** is used for cart state management with:
- Persistent storage (localStorage)
- Add/remove/update cart items
- Automatic total calculation
- Item count tracking

## 🚢 Deployment

For production deployment:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Environment Variables:**
   Update `.env.local` or `.env.production` with production API URLs

## 📝 Next Steps

### Suggested Enhancements
- [ ] User authentication
- [ ] Product search and filtering
- [ ] Wishlist functionality
- [ ] Order history page
- [ ] Submit product reviews
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Product recommendations
- [ ] Email notifications

### Code Quality
- [ ] Add unit tests (Jest/Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Set up CI/CD pipeline
- [ ] Add error boundary components
- [ ] Implement analytics

## 🤝 Contributing

This is an MVP project. Future enhancements and contributions are welcome!

## 📄 License

This project is part of an e-commerce microservices architecture.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
