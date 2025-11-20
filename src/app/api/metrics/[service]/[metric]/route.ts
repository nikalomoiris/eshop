import { NextRequest, NextResponse } from 'next/server';

const SERVICE_URLS: Record<string, string> = {
  product: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL?.replace('/api', '') || 'http://localhost:8080',
  order: process.env.NEXT_PUBLIC_ORDER_SERVICE_URL?.replace('/api', '') || 'http://localhost:8081',
  review: process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL?.replace('/api', '') || 'http://localhost:8082',
  inventory: process.env.NEXT_PUBLIC_INVENTORY_SERVICE_URL?.replace('/api', '') || 'http://localhost:8083',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ service: string; metric: string }> }
) {
  const { service, metric } = await params;

  const serviceUrl = SERVICE_URLS[service];
  if (!serviceUrl) {
    return NextResponse.json(
      { error: `Unknown service: ${service}` },
      { status: 400 }
    );
  }

  try {
    const url = `${serviceUrl}/actuator/metrics/${metric}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch metric ${metric} from ${service}: ${response.status}`);
      return NextResponse.json(
        { error: 'Metric not found', measurements: [{ statistic: 'VALUE', value: 0 }] },
        { status: 200 } // Return 200 with 0 value instead of error
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching metric ${metric} from ${service}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch metric', measurements: [{ statistic: 'VALUE', value: 0 }] },
      { status: 200 } // Return 200 with 0 value instead of error
    );
  }
}
