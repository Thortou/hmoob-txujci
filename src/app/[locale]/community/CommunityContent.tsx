'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { CommunityFeed, DownloadCenter, DownloadItem, NotificationPanel, Post, SearchBar, TrendingTopic, TrendingTopics, UserProfile } from '@/src/components/community';
import type { Notification as CommunityNotification } from '@/src/components/community';

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://i.pravatar.cc/150?u=1',
      verified: true,
      badge: 'Top Contributor',
    },
    content: 'Just finished building an amazing community platform! 🚀 The team has been working tirelessly for months. What features would you like to see next?',
    image: '/education1.jpeg',
    timestamp: '2 hours ago',
    stats: { likes: 1250, comments: 340, shares: 89, views: 15000 },
    liked: false,
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'Chen Wei',
      username: 'chenwei',
      avatar: 'https://i.pravatar.cc/150?u=2',
    },
    content: 'The performance optimizations are incredible! We\'re handling over 1 million requests per second. 🔥',
    timestamp: '5 hours ago',
    stats: { likes: 890, comments: 120, shares: 45, views: 8500 },
    liked: true,
  },
];

const mockTrending: TrendingTopic[] = [
  { id: '1', tag: '#WebDevelopment', posts: 15420, change: 'up', category: 'Tech' },
  { id: '2', tag: '#ReactJS', posts: 12350, change: 'up', category: 'Framework' },
  { id: '3', tag: '#NextJS', posts: 10280, change: 'same', category: 'Framework' },
  { id: '4', tag: '#Community', posts: 8940, change: 'down', category: 'Social' },
  { id: '5', tag: '#TypeScript', posts: 7650, change: 'up', category: 'Language' },
];

const mockDownloads: DownloadItem[] = [
  {
    id: 'dl1',
    name: 'Community Platform Setup Guide.pdf',
    size: 15728640,
    downloaded: 11721505,
    speed: 5242880,
    status: 'downloading',
    url: '/downloads/guide.pdf',
    thumbnail: '/education2.jpeg',
  },
  {
    id: 'dl2',
    name: 'API Documentation v2.0.epub',
    size: 5242880,
    downloaded: 5242880,
    speed: 0,
    status: 'completed',
    url: '/downloads/api-docs.epub',
    thumbnail: '/education4.jpeg',
  },
  {
    id: 'dl3',
    name: 'API Documentation v2.0.epub',
    size: 5242880,
    downloaded: 5242880,
    speed: 0,
    status: 'failed',
    url: '/downloads/api-docs.epub',
    thumbnail: '/education4.jpeg',
  },
];

const mockNotifications: CommunityNotification[] = [
  {
    id: 'notif1',
    type: 'like',
    title: 'Sarah Johnson liked your post',
    message: 'Your post "Building scalable systems" received a like!',
    avatar: 'https://i.pravatar.cc/150?u=1',
    link: '/post/123',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: 'notif2',
    type: 'comment',
    title: 'New comment on your post',
    message: 'Alex replied: "Great insights! Can you share more details?"',
    avatar: 'https://i.pravatar.cc/150?u=3',
    link: '/post/123',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: 'notif3',
    type: 'badge',
    title: 'You earned a new badge!',
    message: 'Congratulations! You\'ve earned "Early Adopter"',
    link: '/profile/badges',
    timestamp: '1 hour ago',
    read: false,
    actionUrl: '/profile/badges/claim',
    actionLabel: 'Claim',
  },
];

export default function CommunityContent() {
  const t = useTranslations('community.feed');

  const handleLike = (postId: string) => {
    // console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    // console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    // console.log('Share post:', postId);
  };

  const handleSearch = async (query: string) => {
    // Mock search implementation
    const results = await fetch(`/api/search?q=${encodeURIComponent(query)}`).then(r => r.json());
    return results;
  };

  return (
    <main className="min-h-screen bg-gray-50 mt-10 dark:bg-zinc-900">
      {/* Header */}
      <section className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder={t('title') || 'Search community...'}
            />
          </div>

          {/* Notification Panel */}
          <div className="flex justify-end">
            <NotificationPanel
              notifications={mockNotifications}
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
              onDismiss={(id) => console.log('Dismiss:', id)}
              onMarkAllAsRead={() => console.log('Mark all as read')}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed (Left - 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Community Feed */}
            <section>
              <CommunityFeed
                posts={mockPosts}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            </section>

            {/* Download Center */}
            <section>
              <DownloadCenter
                downloads={mockDownloads}
                onPause={(id) => console.log('Pause download:', id)}
                onResume={(id) => console.log('Resume download:', id)}
                onCancel={(id) => console.log('Cancel download:', id)}
                onClearCompleted={() => console.log('Clear completed')}
              />
            </section>
          </div>

          {/* Sidebar (Right - 1 column) */}
          <div className="space-y-8">
            {/* User Profile Card */}
            <section>
              <UserProfile
                userId="current-user"
                username="johndoe"
                displayName="John Doe"
                avatar="https://i.pravatar.cc/150?u=current-user"
                coverImage="/banner1.png"
                bio="Community enthusiast and tech lover. Building amazing things with amazing people! 💻✨"
                location="San Francisco, CA"
                website="https://johndoe.dev"
                joinedDate="January 2024"
                verified={true}
                badges={[
                  {
                    id: 'badge1',
                    name: 'Early Adopter',
                    icon: '🚀',
                    description: 'Joined in the first month',
                    rarity: 'rare',
                  },
                  {
                    id: 'badge2',
                    name: 'Top Contributor',
                    icon: '⭐',
                    description: '100+ quality posts',
                    rarity: 'legendary',
                  },
                ]}
                reputation={{
                  level: 42,
                  points: 15000,
                  nextLevel: 20000,
                  rank: 'Community Leader',
                }}
                stats={{
                  posts: 156,
                  followers: 2340,
                  following: 890,
                  likes: 5420,
                }}
              />
            </section>

            {/* Trending Topics */}
            <section>
              <TrendingTopics
                topics={mockTrending}
                realtime={true}
                // onUpdate={(topics) => console.log('Trending updated:', topics)}
              />
            </section>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="bg-sky-600 dark:bg-sky-700 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-sky-100 text-lg mb-6">
            Be part of a platform handling 100M+ active users worldwide
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-sky-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
