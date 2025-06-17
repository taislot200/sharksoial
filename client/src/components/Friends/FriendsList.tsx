import { useQuery } from '@tanstack/react-query';
import { MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { apiService } from '@/services/api.service';
import { FriendsSearch } from './FriendsSearch';

export function FriendsList() {
  const { data: friends, isLoading } = useQuery({
    queryKey: ['/api/friends'],
    queryFn: () => apiService.getFriends()
  });

  const handleMessage = (friendId: number) => {
    console.log('Message friend:', friendId);
    // TODO: Navigate to chat with friend
  };

  const handleViewProfile = (friendId: number) => {
    console.log('View profile:', friendId);
    // TODO: Navigate to friend's profile
  };

  if (isLoading) {
    return (
      <>
        <FriendsSearch />
        <div className="divide-y divide-gray-100">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <FriendsSearch />
      <div className="divide-y divide-gray-100">
        {friends?.map((friend) => (
          <div key={friend.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={friend.avatar || undefined} alt={friend.displayName} />
                  <AvatarFallback>
                    {friend.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{friend.displayName}</h3>
                  <p className="text-sm text-gray-500">เพื่อนร่วมกัน 12 คน</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMessage(friend.id)}
                  className="p-2 text-[hsl(207,90%,54%)] hover:bg-blue-50 rounded-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewProfile(friend.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {friends?.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>ยังไม่มีเพื่อน</p>
            <p className="text-sm">เริ่มค้นหาและเพิ่มเพื่อนกันเถอะ!</p>
          </div>
        )}
      </div>
    </>
  );
}
