import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api.service';

export function ProfileHeader() {
  const { user } = useAuth();
  const { data: userStats } = useQuery({
    queryKey: ['/api/users/me'],
    queryFn: () => apiService.getCurrentUser(),
    enabled: !!user
  });

  const handleEditProfile = () => {
    console.log('Edit profile');
    // TODO: Open edit profile modal
  };

  if (!user) return null;

  return (
    <div className="bg-gradient-to-br from-[hsl(207,90%,54%)] to-[hsl(207,90%,48%)] text-white p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-20 h-20 border-4 border-white/20">
          <AvatarImage src={user.avatar || undefined} alt={user.displayName} />
          <AvatarFallback className="text-2xl bg-white/20">
            {user.displayName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-white/80">@{user.username}</p>
          <p className="text-sm text-white/70 mt-1">{user.bio || 'ยังไม่มีคำแนะนำตัว'}</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleEditProfile}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex justify-around bg-white/10 rounded-xl p-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{userStats?.postsCount || 0}</div>
          <div className="text-sm text-white/70">โพสต์</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{userStats?.friendsCount || 0}</div>
          <div className="text-sm text-white/70">เพื่อน</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{userStats?.likesCount || 0}</div>
          <div className="text-sm text-white/70">ถูกใจ</div>
        </div>
      </div>
    </div>
  );
}
