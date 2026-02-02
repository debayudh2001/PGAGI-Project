import { SocialPost, ContentItem, ContentType } from '@/types/content';

// Mock social media data
const MOCK_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'social-1',
    username: 'tech_enthusiast',
    avatar: 'https://picsum.photos/seed/user1/100',
    content: 'Just discovered an amazing new framework for building web apps! The developer experience is incredible. #webdev #javascript #react',
    image: 'https://picsum.photos/seed/tech1/600/400',
    likes: 245,
    comments: 32,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    hashtags: ['webdev', 'javascript', 'react'],
  },
  {
    id: 'social-2',
    username: 'sports_daily',
    avatar: 'https://picsum.photos/seed/user2/100',
    content: 'What a game! The championship final was absolutely thrilling. Both teams played exceptionally well. #sports #championship #gameday',
    image: 'https://picsum.photos/seed/sports1/600/400',
    likes: 892,
    comments: 156,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    hashtags: ['sports', 'championship', 'gameday'],
  },
  {
    id: 'social-3',
    username: 'finance_guru',
    avatar: 'https://picsum.photos/seed/user3/100',
    content: 'Market analysis: Key indicators suggest interesting trends for Q2. Always do your own research! #finance #investing #markets',
    image: null,
    likes: 567,
    comments: 89,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    hashtags: ['finance', 'investing', 'markets'],
  },
  {
    id: 'social-4',
    username: 'entertainment_buzz',
    avatar: 'https://picsum.photos/seed/user4/100',
    content: 'New movie releases this weekend are looking fantastic! Can\'t wait to catch them all. #movies #entertainment #weekend',
    image: 'https://picsum.photos/seed/movie1/600/400',
    likes: 1203,
    comments: 234,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    hashtags: ['movies', 'entertainment', 'weekend'],
  },
  {
    id: 'social-5',
    username: 'health_wellness',
    avatar: 'https://picsum.photos/seed/user5/100',
    content: 'Morning workout complete! Remember, consistency is key to achieving your fitness goals. #health #fitness #wellness',
    image: 'https://picsum.photos/seed/fitness1/600/400',
    likes: 445,
    comments: 67,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    hashtags: ['health', 'fitness', 'wellness'],
  },
  {
    id: 'social-6',
    username: 'science_daily',
    avatar: 'https://picsum.photos/seed/user6/100',
    content: 'Fascinating new research on renewable energy! The future is looking brighter. #science #technology #sustainability',
    image: 'https://picsum.photos/seed/science1/600/400',
    likes: 678,
    comments: 123,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    hashtags: ['science', 'technology', 'sustainability'],
  },
  {
    id: 'social-7',
    username: 'coding_life',
    avatar: 'https://picsum.photos/seed/user7/100',
    content: 'Debugging at 2 AM hits different 😅 But finally solved that tricky bug! #coding #programming #developer',
    image: null,
    likes: 512,
    comments: 78,
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    hashtags: ['coding', 'programming', 'developer'],
  },
  {
    id: 'social-8',
    username: 'travel_diaries',
    avatar: 'https://picsum.photos/seed/user8/100',
    content: 'Exploring hidden gems around the world. This place is absolutely breathtaking! #travel #adventure #explore',
    image: 'https://picsum.photos/seed/travel1/600/400',
    likes: 1456,
    comments: 289,
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    hashtags: ['travel', 'adventure', 'explore'],
  },
];

// Transform SocialPost to ContentItem
const transformSocialPost = (post: SocialPost): ContentItem => {
  return {
    id: post.id,
    type: ContentType.SOCIAL,
    title: `@${post.username}`,
    description: post.content,
    image: post.image,
    source: 'Social Media',
    publishedAt: post.timestamp,
    metadata: {
      author: post.username,
      likes: post.likes,
      comments: post.comments,
      hashtags: post.hashtags,
    },
  };
};

// Fetch social posts (mock data)
export const fetchSocialPosts = async (limit: number = 10): Promise<ContentItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return MOCK_SOCIAL_POSTS.slice(0, limit).map(transformSocialPost);
};

// Search social posts by keyword or hashtag
export const searchSocialPosts = async (query: string): Promise<ContentItem[]> => {
  if (!query.trim()) {
    return [];
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const lowerQuery = query.toLowerCase();
  
  const filtered = MOCK_SOCIAL_POSTS.filter(post => {
    return (
      post.content.toLowerCase().includes(lowerQuery) ||
      post.username.toLowerCase().includes(lowerQuery) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });

  return filtered.map(transformSocialPost);
};

// Fetch trending social posts (sorted by engagement)
export const fetchTrendingSocialPosts = async (): Promise<ContentItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const sorted = [...MOCK_SOCIAL_POSTS].sort((a, b) => {
    const engagementA = a.likes + a.comments;
    const engagementB = b.likes + b.comments;
    return engagementB - engagementA;
  });

  return sorted.slice(0, 5).map(transformSocialPost);
};
