import { NextRequest, NextResponse } from 'next/server';

const PRODUCT_SERVICE_URL = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:8080/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const queryPart = queryString ? '?' + queryString : '';
    const url = `${PRODUCT_SERVICE_URL}/products${queryPart}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Product API Response:', JSON.stringify(data, null, 2));
    
    // Backend returns array directly, wrap it in expected format
    const result = Array.isArray(data) 
      ? { products: data, total: data.length, page: 1, pageSize: data.length }
      : data;
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
