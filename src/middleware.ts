import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow larger payloads for image uploads
  if (request.nextUrl.pathname.startsWith('/api/products/') && 
      request.nextUrl.pathname.endsWith('/images')) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
