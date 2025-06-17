import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api.service';
import { PostCard } from './PostCard';
import { PostComposer } from './PostComposer';
import { Skeleton } from '@/components/ui/skeleton';

export function PostFeed() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['/api/posts'],
    queryFn: () => apiService.getPosts()
  });

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">เกิดข้อผิดพลาดในการโหลดโพสต์</p>
      </div>
    );
  }

  return (
    <>
      <PostComposer />
      <div className="space-y-2">
        {isLoading ? (
          // Loading skeleton
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border-b border-gray-100 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-64 w-full rounded-xl mb-4" />
              <div className="flex items-center space-x-6">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
          ))
        ) : (
          posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </>
  );
}
