import { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
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
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
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
    setLikesCount(prev => (prev ?? 0) + (newLikedState ? 1 : -1));
    likeMutation.mutate(newLikedState);
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    saveMutation.mutate(newSavedState);
  };

  const handleComment = () => {
    // TODO: Navigate to comments
  };

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  const handleMenu = () => {
    // TODO: Show post options menu
  };

  // HACKER STYLE COLORS
  // bg-[#101010] text-[#39ff14] border-[#39ff14] font-mono
  // button: bg-transparent border border-[#39ff14] hover:bg-[#222] text-[#39ff14]

  return (
    <article className="bg-[#101010] border border-[#39ff14] rounded-xl shadow-lg font-mono text-[#39ff14] mb-6 overflow-hidden transition-all duration-200 hover:shadow-2xl">
      <div className="p-4 flex items-center gap-3 border-b border-[#39ff14]/30">
        <div className="w-12 h-12 rounded-full bg-[#222] border border-[#39ff14] flex items-center justify-center overflow-hidden">
          {post.author.avatar ? (
            <img src={post.author.avatar} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl select-none">{post.author.displayName.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="font-bold text-[#39ff14] text-lg leading-tight">{post.author.displayName}</div>
          <div className="text-xs text-[#39ff14]/70">
            {formatDistanceToNow(new Date(post.createdAt!), { addSuffix: true, locale: th })}
          </div>
        </div>
        <button onClick={handleMenu} className="p-1 rounded hover:bg-[#222] text-[#39ff14]/70" title="เมนูโพสต์">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4 pb-2">
        <pre className="whitespace-pre-wrap break-words text-base bg-transparent text-[#39ff14] mb-3">{post.content}</pre>
        {post.imageUrl && (
          <div className="w-full rounded-lg overflow-hidden border border-[#39ff14]/40 mb-3 bg-[#181818]">
            <img src={post.imageUrl} alt="Post image" className="w-full object-cover max-h-72" />
          </div>
        )}
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 py-1 border border-[#39ff14] rounded bg-transparent hover:bg-[#222] transition text-[#39ff14] ${isLiked ? 'bg-[#39ff14]/10 border-[#39ff14] font-bold' : ''}`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-[#39ff14]' : ''}`} />
            <span>{likesCount}</span>
          </button>
          <button
            onClick={handleComment}
            className="flex items-center gap-1 px-2 py-1 border border-[#39ff14] rounded bg-transparent hover:bg-[#222] transition text-[#39ff14]"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.commentsCount}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-2 py-1 border border-[#39ff14] rounded bg-transparent hover:bg-[#222] transition text-[#39ff14]"
          >
            <Share className="h-5 w-5" />
            <span>SHARE</span>
          </button>
        </div>
        <button
          onClick={handleSave}
          className={`px-2 py-1 border border-[#39ff14] rounded bg-transparent hover:bg-[#222] transition text-[#39ff14] ${isSaved ? 'bg-[#39ff14]/10 border-[#39ff14] font-bold' : ''}`}
          title={isSaved ? 'ยกเลิกบันทึกโพสต์' : 'บันทึกโพสต์'}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-[#39ff14]' : ''}`} />
        </button>
      </div>
    </article>
  );
}
