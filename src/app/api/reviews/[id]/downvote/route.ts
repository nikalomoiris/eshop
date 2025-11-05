import { NextRequest, NextResponse } from 'next/server';

const REVIEW_SERVICE_URL = process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL || 'http://localhost:8082/api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = `${REVIEW_SERVICE_URL}/reviews/${id}/downvote`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error downvoting review:', error);
      return NextResponse.json(
        { error: 'Failed to downvote review' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error downvoting review:', error);
    return NextResponse.json(
      { error: 'Failed to downvote review' },
      { status: 500 }
    );
  }
}
