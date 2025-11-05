import { NextRequest, NextResponse } from 'next/server';

const REVIEW_SERVICE_URL = process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL || 'http://localhost:8082/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = `${REVIEW_SERVICE_URL}/reviews`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error creating review:', error);
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
