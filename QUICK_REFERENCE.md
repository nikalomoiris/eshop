# Quick Reference Guide

## 🚀 Getting Started

```bash
npm install          # Install dependencies
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm start           # Run production server
```

## 📂 Key Files

### Pages
- `src/app/page.tsx` - Home page
- `src/app/products/page.tsx` - Product listing
- `src/app/products/[id]/page.tsx` - Product detail
- `src/app/cart/page.tsx` - Shopping cart
- `src/app/checkout/page.tsx` - Checkout
- `src/app/orders/[id]/page.tsx` - Order confirmation

### Components
- `components/ui/*` - Reusable UI components
- `components/layout/*` - Layout components
- `components/product/*` - Product components
- `components/cart/*` - Cart components
- `components/review/*` - Review components

### Business Logic
- `lib/api/*` - Backend API integration
- `lib/types/*` - TypeScript type definitions
- `store/cart.ts` - Cart state management

## 🎨 UI Components Cheat Sheet

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Badge
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
```

### Alert
```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Operation completed</AlertDescription>
</Alert>
```

## 🔌 API Usage Examples

### Fetch Products
```tsx
import { productApi } from '@/lib/api/products';

const products = await productApi.getProducts({
  page: 1,
  pageSize: 20,
  category: 'electronics'
});
```

### Check Stock
```tsx
import { inventoryApi } from '@/lib/api/inventory';

const stockInfo = await inventoryApi.getStockStatus(productId);
// Returns: { productId, quantity, status: 'in-stock' | 'low-stock' | 'out-of-stock' }
```

### Create Order
```tsx
import { orderApi } from '@/lib/api/orders';

const order = await orderApi.createOrder({
  items: [{ productId: '1', quantity: 2 }],
  shippingAddress: { /* address data */ }
});
```

### Get Reviews
```tsx
import { reviewApi } from '@/lib/api/reviews';

const reviews = await reviewApi.getProductReviews(productId);
```

## 🛒 Cart Store Usage

```tsx
import { useCartStore } from '@/store/cart';

// In component
function MyComponent() {
  // Get state
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const itemCount = useCartStore((state) => state.itemCount);
  
  // Get actions
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Use them
  const handleAdd = () => addItem(product, 1);
  const handleRemove = () => removeItem(productId);
  const handleUpdate = () => updateQuantity(productId, 5);
}
```

## 🎯 Common Patterns

### Loading State
```tsx
const [loading, setLoading] = useState(false);

{loading && <Spinner size="lg" />}
```

### Error Handling
```tsx
const [error, setError] = useState<string | null>(null);

{error && (
  <Alert variant="error">
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</div>
```

### Conditional Styling
```tsx
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  className
)} />
```

## 🔧 Utility Functions

### Format Price
```tsx
import { formatPrice } from '@/lib/utils/format';

formatPrice(1999.99) // "$1,999.99"
```

### Format Date
```tsx
import { formatDate } from '@/lib/utils/format';

formatDate(new Date()) // "November 2, 2025"
formatDate("2025-11-02") // "November 2, 2025"
```

## 🎨 Tailwind Classes Reference

### Common Patterns
```
Spacing:      p-4, px-6, py-2, m-4, mx-auto, mt-8
Sizing:       w-full, h-screen, max-w-7xl
Flex:         flex, flex-col, items-center, justify-between, gap-4
Grid:         grid, grid-cols-3, gap-6
Text:         text-lg, font-bold, text-slate-900, text-center
Border:       border, border-slate-200, rounded-lg
Shadow:       shadow-sm, shadow-md, shadow-lg
Colors:       bg-white, text-slate-600, hover:bg-slate-100
```

### Responsive Design
```tsx
// Mobile first approach
<div className="p-4 md:p-6 lg:p-8">
  {/* Padding increases on larger screens */}
</div>

<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  {/* 1 col on mobile, 2 on tablet, 4 on desktop */}
</div>
```

## 🐛 Debugging Tips

### Check Cart State
```tsx
// In browser console
localStorage.getItem('cart-storage')
```

### Clear Cart
```tsx
// In browser console
localStorage.removeItem('cart-storage')
```

### Check API Calls
Open browser DevTools → Network tab → Filter by XHR/Fetch

### React DevTools
Install React DevTools extension to inspect component tree and state

## 📝 TypeScript Tips

### Component Props
```tsx
interface MyComponentProps {
  title: string;
  count?: number; // Optional
  onClick: () => void;
}

export function MyComponent({ title, count = 0, onClick }: Readonly<MyComponentProps>) {
  // Implementation
}
```

### API Response
```tsx
const response = await productApi.getProducts();
// TypeScript knows response is ProductListResponse
```

## 🔄 Common Tasks

### Add a New Page
1. Create file in `src/app/new-page/page.tsx`
2. Export default function component
3. Add link in Header navigation

### Add a New UI Component
1. Create file in `components/ui/new-component.tsx`
2. Follow existing patterns (use `cn()`, TypeScript, etc.)
3. Import and use in pages/components

### Add a New API Method
1. Add method to appropriate file in `lib/api/`
2. Add types if needed in `lib/types/`
3. Use in components with error handling

### Style with Tailwind
1. Use utility classes directly in className
2. Use `cn()` for conditional classes
3. Follow responsive-first approach (mobile → desktop)

## 🚨 Common Issues & Solutions

**Issue**: Cart not persisting
- **Solution**: Check localStorage, ensure `persist` middleware is working

**Issue**: API calls failing
- **Solution**: Verify backend services are running, check URLs in `.env.local`

**Issue**: TypeScript errors
- **Solution**: Run `npm run build` to see all type errors

**Issue**: Styling not applying
- **Solution**: Check Tailwind config, ensure classes are correct

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 🎉 Quick Wins

Want to see results fast?

1. **Start dev server**: `npm run dev`
2. **Open browser**: http://localhost:3000
3. **Click "Shop Now"**: Browse products
4. **Add to cart**: Click "Add to Cart" on any product
5. **View cart**: Click cart icon in header
6. **Place order**: Go through checkout

That's it! You've got a working e-commerce frontend! 🛍️
