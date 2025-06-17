import { TopBar } from '@/components/Layout/TopBar';
import { BottomNavigation } from '@/components/Layout/BottomNavigation';
import { FloatingActionButton } from '@/components/Layout/FloatingActionButton';
import { ChatSearch } from '@/components/Chat/ChatSearch';
import { ChatList } from '@/components/Chat/ChatList';
import { PostFeed } from '@/components/Posts/PostFeed';
import { FriendsList } from '@/components/Friends/FriendsList';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProfileActions } from '@/components/Profile/ProfileActions';
import { ProfileMenu } from '@/components/Profile/ProfileMenu';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { activeTab } = useApp();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 bg-[hsl(207,90%,54%)] rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl">🦈</span>
          </div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div>
            <ChatSearch />
            <ChatList />
          </div>
        );
      
      case 'posts':
        return <PostFeed />;
      
      case 'friends':
        return <FriendsList />;
      
      case 'profile':
        return (
          <div>
            <ProfileHeader />
            <ProfileActions />
            <ProfileMenu />
          </div>
        );
      
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      <TopBar />
      
      <main className="pb-20">
        {renderTabContent()}
      </main>
      
      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
}
