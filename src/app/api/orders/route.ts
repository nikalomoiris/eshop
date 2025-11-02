import { NextRequest, NextResponse } from 'next/server';

const ORDER_SERVICE_URL = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL || 'http://localhost:8081/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Create Order Request (Frontend):', JSON.stringify(body, null, 2));
    
    // Transform frontend request to backend format
    // Frontend sends: { items: [{productId, quantity}], shippingAddress: {...} }
    // Backend expects: { orderLineItemsDtoList: [{sku, price, quantity, productId}] }
    
    // Fetch product details for each item to get SKU and price
    const PRODUCT_SERVICE_URL = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:8080/api';
    const orderLineItems = await Promise.all(
      body.items.map(async (item: any) => {
        // Fetch product details
        const productResponse = await fetch(`${PRODUCT_SERVICE_URL}/products/${item.productId}`);
        const product = await productResponse.json();
        
        return {
          sku: product.sku,
          price: product.price,
          quantity: item.quantity,
          productId: item.productId
        };
      })
    );
    
    const backendRequest = {
      orderLineItemsDtoList: orderLineItems
    };
    
    console.log('Create Order Request (Backend):', JSON.stringify(backendRequest, null, 2));
    const url = `${ORDER_SERVICE_URL}/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Order creation failed:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to create order', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.text(); // Backend returns "Order Created Successfully"
    console.log('Create Order Response:', data);
    
    // Return a proper order response with an ID
    return NextResponse.json({ 
      id: Date.now().toString(), // Generate a temporary ID since backend doesn't return one
      message: data,
      success: true 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const url = `${ORDER_SERVICE_URL}/orders`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Get Orders API Response:', JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
