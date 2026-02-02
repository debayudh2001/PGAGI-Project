import axios from 'axios';
import { NewsAPIResponse, NewsArticle, ContentItem, ContentType, NewsCategory } from '@/types/content';
import { NEWS_API_URL, NEWS_API_KEY } from '@/lib/utils/constants';

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
    const response = await axios.get<NewsAPIResponse>(`${NEWS_API_URL}/top-headlines`, {
      params: {
        apikey: NEWS_API_KEY,
        category: category,
        lang: 'en',
        page,
        max: 10
      },
    });

    return response.data.articles.map(article => transformNewsArticle(article, category));
  } catch (error) {
    console.error(`Error fetching news for category ${category}:`, error);
    throw new Error(`Failed to fetch news for ${category}`);
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
    throw new Error('Failed to fetch news');
  }
};

// Search news articles
export const searchNews = async (query: string): Promise<ContentItem[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await axios.get<NewsAPIResponse>(`${NEWS_API_URL}/search`, {
      params: {
        apikey: NEWS_API_KEY,
        q: query,
        lang: 'en',
        sortBy: 'relevancy',
        max: 10
      },
    });

    return response.data.articles.map(article => transformNewsArticle(article));
  } catch (error) {
    console.error('Error searching news:', error);
    throw new Error('Failed to search news');
  }
};

// Fetch trending/top news
export const fetchTrendingNews = async (): Promise<ContentItem[]> => {
  try {
    const response = await axios.get<NewsAPIResponse>(`${NEWS_API_URL}/top-headlines`, {
      params: {
        apikey: NEWS_API_KEY,
        lang: 'en',
        max: 10
      },
    });

    return response.data.articles.map(article => transformNewsArticle(article));
  } catch (error) {
    console.error('Error fetching trending news:', error);
    throw new Error('Failed to fetch trending news');
  }
};




