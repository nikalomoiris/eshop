import { NextRequest, NextResponse } from 'next/server';

const PRODUCT_SERVICE_URL = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:8080/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const url = `${PRODUCT_SERVICE_URL}/products/${params.id}/images`;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to upload image' },
        { status: response.status }
      );
    }

    const data = await response.text();
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
