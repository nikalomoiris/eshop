import { NextRequest, NextResponse } from 'next/server';

const INVENTORY_SERVICE_URL = process.env.NEXT_PUBLIC_INVENTORY_SERVICE_URL || 'http://localhost:8083/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // The 'id' here is actually the SKU from the frontend
    const url = `${INVENTORY_SERVICE_URL}/inventory/${id}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(`Inventory ${id} returned ${response.status}, returning default out-of-stock`);
      // Return default inventory when not found
      return NextResponse.json({
        productId: id,
        sku: id,
        quantity: 0,
        reserved: 0,
        available: 0
      });
    }

    const data = await response.json();
    console.log(`Inventory ${id} API Response:`, JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
