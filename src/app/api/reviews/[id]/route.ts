import { NextRequest, NextResponse } from 'next/server';

const REVIEW_SERVICE_URL = process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL || 'http://localhost:8082/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = `${REVIEW_SERVICE_URL}/reviews/product/${id}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json([], { status: 200 }); // Return empty array if no reviews
    }

    const data = await response.json();
    console.log(`Reviews for product ${id} API Response:`, JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}
