# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Architecture

### Component Design Principles

1. **Separation of Concerns**
   - UI components in `components/ui/` are pure and reusable
   - Feature components in `components/product/`, `components/cart/`, etc. contain business logic
   - Layout components in `components/layout/` handle page structure

2. **Composition Over Inheritance**
   - Build complex components by composing simpler ones
   - Example: `ProductCard` uses `Card`, `Button`, `Badge` from UI library

3. **Type Safety**
   - All components use TypeScript
   - Shared types defined in `lib/types/`
   - Props interfaces clearly defined

### State Management

**Zustand Store (`store/cart.ts`)**
- Lightweight alternative to Redux
- Persistent cart storage
- Simple API: `useCartStore((state) => state.items)`

### API Layer

**Client Structure (`lib/api/`)**
- `client.ts` - Base HTTP client with error handling
- Service files - One per backend service
- Centralized API configuration

**Error Handling**
- Network errors caught and displayed
- User-friendly error messages
- Retry logic where appropriate

## Adding New Features

### Adding a New Page

1. Create page file in `src/app/`:
```tsx
// src/app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
```

2. Add navigation link in `components/layout/header.tsx`

### Adding a New Component

1. Create component in appropriate directory:
```tsx
// components/ui/new-component.tsx
import { cn } from '@/lib/utils/cn';

interface NewComponentProps {
  children: React.ReactNode;
  className?: string;
}

export function NewComponent({ children, className }: Readonly<NewComponentProps>) {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  );
}
```

2. Export from index if creating a component library

### Adding a New API Endpoint

1. Add to appropriate service file in `lib/api/`:
```typescript
// lib/api/products.ts
export const productApi = {
  // ... existing methods
  
  async searchProducts(query: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`${BASE_URL}/products/search?q=${query}`);
  },
};
```

2. Add TypeScript types if needed in `lib/types/`

## Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes for styling
- Follow mobile-first approach
- Use semantic color names from theme

### Class Name Utilities

Use `cn()` helper to merge classes:
```tsx
import { cn } from '@/lib/utils/cn';

<div className={cn('base-class', 'conditional-class', className)} />
```

### Responsive Breakpoints

```
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large screens
```

## Code Standards

### TypeScript

- Use `interface` for props and data structures
- Avoid `any` type
- Use strict type checking

### React

- Prefer function components
- Use hooks for state and effects
- Keep components small and focused
- Use `'use client'` directive only when needed

### Naming Conventions

- Components: PascalCase (`ProductCard`)
- Files: kebab-case (`product-card.tsx`)
- Functions: camelCase (`formatPrice`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

## Testing (Future)

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## Performance Optimization

### Image Optimization
- Use Next.js `Image` component
- Provide appropriate `sizes` prop
- Use lazy loading for below-fold images

### Code Splitting
- Automatic with Next.js App Router
- Use dynamic imports for large components

### Caching
- API responses cached where appropriate
- Static assets cached by Next.js

## Debugging

### VS Code Launch Config
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
```

### Browser DevTools
- React DevTools for component inspection
- Network tab for API calls
- Console for errors

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Backend Services Not Running
```bash
# Check backend services
docker ps

# Start backend services
cd ../backend-project
docker-compose up -d
```

### Cache Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules
npm install
```

## Environment Variables

Always prefix browser-accessible variables with `NEXT_PUBLIC_`:

```env
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8080/api
```

Server-only variables don't need the prefix:
```env
DATABASE_URL=postgres://...
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## Deployment Checklist

- [ ] Update environment variables for production
- [ ] Test build locally: `npm run build && npm start`
- [ ] Verify all API endpoints are accessible
- [ ] Check responsive design on multiple devices
- [ ] Test critical user flows
- [ ] Review error handling
- [ ] Check console for warnings/errors
- [ ] Optimize images
- [ ] Configure CORS on backend if needed

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org/docs/)
