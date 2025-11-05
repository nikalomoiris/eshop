import { NextRequest, NextResponse } from 'next/server';

const INVENTORY_SERVICE_URL = process.env.NEXT_PUBLIC_INVENTORY_SERVICE_URL || 'http://localhost:8083/api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; quantity: string }> }
) {
  try {
    const { id, quantity } = await params;
    const url = `${INVENTORY_SERVICE_URL}/inventory/${id}/quantity/${quantity}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error updating inventory:', error);
      return NextResponse.json(
        { error: 'Failed to update inventory' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating inventory:', error);
    return NextResponse.json(
      { error: 'Failed to update inventory' },
      { status: 500 }
    );
  }
}
