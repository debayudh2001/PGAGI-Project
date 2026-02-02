import axios from 'axios';
import { NewsAPIResponse, NewsArticle, ContentItem, ContentType, NewsCategory } from '@/types/content';

// Use local API route instead of calling GNews directly (fixes CORS)
const API_BASE_URL = '/api/news';

interface NewsAPIRouteResponse {
  success: boolean;
  articles?: NewsArticle[];
  error?: string;
}

// Transform NewsAPI article to ContentItem
const transformNewsArticle = (article: NewsArticle, category?: NewsCategory): ContentItem => {
  return {
    id: `news-${article.url}`,
    type: ContentType.NEWS,
    title: article.title,
    description: article.description || article.content || 'No description available',
    image: article.urlToImage,
    url: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt,
    newsCategory: category,
    metadata: {
      author: article.author || undefined,
    },
  };
};

// Fetch news by category
export const fetchNewsByCategory = async (
  category: NewsCategory,
  page: number = 1
): Promise<ContentItem[]> => {
  try {
    console.log(`[NewsAPI] Fetching ${category} news, page ${page}`);
    
    const response = await axios.get<NewsAPIRouteResponse>(API_BASE_URL, {
      params: {
        endpoint: 'top-headlines',
        category: category,
        page,
      },
    });

    if (!response.data.success || !response.data.articles) {
      console.warn(`[NewsAPI] No articles returned for category: ${category}`);
      return [];
    }

    console.log(`[NewsAPI] Successfully fetched ${response.data.articles.length} articles for ${category}`);
    return response.data.articles.map(article => transformNewsArticle(article, category));
  } catch (error: any) {
    // Enhanced error logging
    if (axios.isAxiosError(error)) {
      console.error(`[NewsAPI] Axios Error for ${category}:`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      
      // Check for rate limit (429) or other specific errors
      if (error.response?.status === 429) {
        console.error('[NewsAPI] ⚠️ RATE LIMIT EXCEEDED - You have hit the GNews API request limit (100/day on free tier)');
      } else if (error.response?.status === 403) {
        console.error('[NewsAPI] ⚠️ FORBIDDEN - Check your API key');
      }
    } else {
      console.error(`[NewsAPI] Unknown error for ${category}:`, error);
    }
    
    // Return empty array instead of throwing to prevent entire feed from failing
    return [];
  }
};

// Fetch news for multiple categories
export const fetchNewsByCategories = async (
  categories: NewsCategory[],
  page: number = 1
): Promise<ContentItem[]> => {
  try {
    const promises = categories.map(category => fetchNewsByCategory(category, page));
    const results = await Promise.allSettled(promises);
    
    const successfulResults = results
      .filter((result): result is PromiseFulfilledResult<ContentItem[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);

    return successfulResults;
  } catch (error) {
    console.error('Error fetching news by categories:', error);
    return [];
  }
};

// Search news articles
export const searchNews = async (query: string): Promise<ContentItem[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    console.log(`[NewsAPI] Searching for: "${query}"`);
    
    const response = await axios.get<NewsAPIRouteResponse>(API_BASE_URL, {
      params: {
        endpoint: 'search',
        q: query,
      },
    });

    if (!response.data.success || !response.data.articles) {
      return [];
    }

    console.log(`[NewsAPI] Search found ${response.data.articles.length} articles`);
    return response.data.articles.map(article => transformNewsArticle(article));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('[NewsAPI] Search error:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      if (error.response?.status === 429) {
        console.error('[NewsAPI] ⚠️ RATE LIMIT EXCEEDED during search');
      }
    }
    return [];
  }
};

// Fetch trending/top news
export const fetchTrendingNews = async (): Promise<ContentItem[]> => {
  try {
    console.log('[NewsAPI] Fetching trending news');
    
    const response = await axios.get<NewsAPIRouteResponse>(API_BASE_URL, {
      params: {
        endpoint: 'top-headlines',
      },
    });

    if (!response.data.success || !response.data.articles) {
      return [];
    }

    console.log(`[NewsAPI] Trending: ${response.data.articles.length} articles`);
    return response.data.articles.map(article => transformNewsArticle(article));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('[NewsAPI] Trending error:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      if (error.response?.status === 429) {
        console.error('[NewsAPI] ⚠️ RATE LIMIT EXCEEDED for trending');
      }
    }
    return [];
  }
};
