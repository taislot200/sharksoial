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
      <div className="divide-y divide-gray-100">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
    <div className="divide-y divide-gray-100">
      {chats?.map((chat) => (
        <div
          key={chat.id}
          className="p-4 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
          onClick={() => handleChatClick(chat.id)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={chat.avatar || undefined} alt={chat.name || 'Chat'} />
                <AvatarFallback>
                  {chat.name?.charAt(0) || 'C'}
                </AvatarFallback>
              </Avatar>
              {chat.members && chat.members.some(m => m.isOnline) && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[hsl(170,100%,41%)] border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 truncate">
                  {chat.name || 'Unnamed Chat'}
                </h3>
                <span className="text-xs text-gray-500">
                  {chat.lastMessage && formatDistanceToNow(new Date(chat.lastMessage.createdAt!), { 
                    addSuffix: true, 
                    locale: th 
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage ? (
                  chat.isGroup && chat.lastMessage.sender ? 
                    `${chat.lastMessage.sender.displayName}: ${chat.lastMessage.content}` :
                    chat.lastMessage.content
                ) : 'ไม่มีข้อความ'}
              </p>
            </div>
            {chat.unreadCount && chat.unreadCount > 0 && (
              <div className="flex flex-col items-end space-y-1">
                <span className="w-5 h-5 bg-[hsl(0,84.2%,60.2%)] text-white text-xs rounded-full flex items-center justify-center">
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
