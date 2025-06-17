import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

export function FloatingActionButton() {
  const { activeTab } = useApp();

  const handleClick = () => {
    switch (activeTab) {
      case 'chat':
        // Open new chat
        console.log('Create new chat');
        break;
      case 'posts':
        // Create new post
        console.log('Create new post');
        break;
      case 'friends':
        // Add new friend
        console.log('Add new friend');
        break;
      default:
        console.log('Quick action');
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-[hsl(14,100%,57%)] hover:bg-[hsl(0,84.2%,60.2%)] text-white rounded-full shadow-lg flex items-center justify-center text-xl z-40"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
