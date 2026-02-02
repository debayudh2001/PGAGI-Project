import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || 'https://gnews.io/api/v4';
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('q');
    const endpoint = searchParams.get('endpoint') || 'top-headlines';

    console.log(`[API Route] News request: endpoint=${endpoint}, category=${category}, query=${query}`);

    // Build params based on endpoint type
    const params: any = {
      apikey: NEWS_API_KEY,
      lang: 'en',
      max: 10,
    };

    if (endpoint === 'search' && query) {
      params.q = query;
      params.sortBy = 'relevancy';
    } else if (endpoint === 'top-headlines') {
      if (category) {
        params.category = category;
      }
      params.page = page;
    }

    const response = await axios.get(`${NEWS_API_URL}/${endpoint}`, {
      params,
      timeout: 10000,
    });

    console.log(`[API Route] Success: ${response.data.articles?.length || 0} articles`);

    return NextResponse.json({
      success: true,
      articles: response.data.articles || [],
      totalResults: response.data.totalResults || 0,
    });

  } catch (error: any) {
    console.error('[API Route] Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.errors?.[0] || error.message;

      return NextResponse.json(
        {
          success: false,
          error: message,
          status,
        },
        { status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
