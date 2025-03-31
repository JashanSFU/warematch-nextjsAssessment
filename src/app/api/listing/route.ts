import { NextResponse } from 'next/server';
import { fetchToken } from '@/app/utils/token';

export async function GET() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // Get Token using reusable function
    const token = await fetchToken();

    // Fetch listings using the token
    const response = await fetch(`${API_BASE_URL}/listings/listings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch listings' }, { status: response.status });
    }

    const listings = await response.json();
    console.log(listings);
    return NextResponse.json(listings);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
