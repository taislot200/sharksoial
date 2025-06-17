import { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostWithAuthor } from '@shared/schema';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api.service';

interface PostCardProps {
  post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (liked: boolean) => 
      liked ? apiService.likePost(post.id) : apiService.unlikePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    }
  });

  const saveMutation = useMutation({
    mutationFn: (saved: boolean) => 
      saved ? apiService.savePost(post.id) : apiService.unsavePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    }
  });

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    likeMutation.mutate(newLikedState);
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    saveMutation.mutate(newSavedState);
  };

  const handleComment = () => {
    console.log('Show comments for post:', post.id);
    // TODO: Navigate to comments
  };

  const handleShare = () => {
    console.log('Share post:', post.id);
    // TODO: Implement share functionality
  };

  const handleMenu = () => {
    console.log('Show post menu:', post.id);
    // TODO: Show post options menu
  };

  return (
    <article className="bg-white border-b border-gray-100">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author.avatar || undefined} alt={post.author.displayName} />
            <AvatarFallback>
              {post.author.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{post.author.displayName}</h4>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt!), { 
                addSuffix: true, 
                locale: th 
              })}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleMenu}>
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
        
        <p className="text-gray-800 mb-4">{post.content}</p>
        
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt="Post image" 
            className="w-full rounded-xl mb-4 object-cover h-64" 
          />
        )}
      </div>
      
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked 
                  ? 'text-[hsl(0,84.2%,60.2%)]' 
                  : 'text-gray-600 hover:text-[hsl(0,84.2%,60.2%)]'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likesCount}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleComment}
              className="flex items-center space-x-2 text-gray-600 hover:text-[hsl(207,90%,54%)]"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post.commentsCount}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:text-[hsl(170,100%,41%)]"
            >
              <Share className="h-5 w-5" />
              <span className="text-sm">แชร์</span>
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSave}
            className={`${
              isSaved 
                ? 'text-[hsl(45,93%,66%)]' 
                : 'text-gray-600 hover:text-[hsl(45,93%,66%)]'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </article>
  );
}
