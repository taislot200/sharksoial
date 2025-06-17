import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api.service';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';

export function ChatList() {
  const { data: chats, isLoading } = useQuery({
    queryKey: ['/api/chats'],
    queryFn: () => apiService.getChats()
  });

  if (isLoading) {
    return (
      <div className="divide-y divide-[#39ff14]/20 bg-[#101010] font-mono">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#222] rounded-full border border-[#39ff14]/40"></div>
              <div className="flex-1">
                <div className="h-4 bg-[#222] rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-[#222] rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const handleChatClick = (chatId: number) => {
    console.log('Open chat:', chatId);
    // TODO: Navigate to chat detail
  };

  return (
    <div className="divide-y divide-[#39ff14]/20 bg-[#101010] font-mono">
      {chats?.map((chat) => (
        <div
          key={chat.id}
          className="p-4 hover:bg-[#181818] active:bg-[#222] cursor-pointer transition-all border-b border-[#39ff14]/20 group"
          onClick={() => handleChatClick(chat.id)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12 border border-[#39ff14]/60 bg-[#181818]">
                <AvatarImage src={chat.avatar || undefined} alt={chat.name || 'Chat'} />
                <AvatarFallback className="bg-[#222] text-[#39ff14] font-bold">
                  {chat.name?.charAt(0) || 'C'}
                </AvatarFallback>
              </Avatar>
              {chat.members && chat.members.some(m => m.isOnline) && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#39ff14] border-2 border-[#101010] rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#39ff14] truncate group-hover:underline">
                  {chat.name || 'Unnamed Chat'}
                </h3>
                <span className="text-xs text-[#39ff14]/60">
                  {chat.lastMessage && formatDistanceToNow(new Date(chat.lastMessage.createdAt!), { 
                    addSuffix: true, 
                    locale: th 
                  })}
                </span>
              </div>
              <p className="text-sm text-[#39ff14]/80 truncate">
                {chat.lastMessage ? (
                  chat.isGroup && chat.lastMessage.sender ? 
                    `${chat.lastMessage.sender.displayName}: ${chat.lastMessage.content}` :
                    chat.lastMessage.content
                ) : 'ไม่มีข้อความ'}
              </p>
            </div>
            {chat.unreadCount && chat.unreadCount > 0 && (
              <div className="flex flex-col items-end space-y-1">
                <span className="w-5 h-5 bg-[#39ff14] text-[#101010] text-xs rounded-full flex items-center justify-center font-bold border border-[#39ff14]/80">
                  {chat.unreadCount}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
