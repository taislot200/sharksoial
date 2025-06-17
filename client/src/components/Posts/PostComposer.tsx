import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

export function PostComposer() {
  const { user } = useAuth();
  const [isComposing, setIsComposing] = useState(false);

  const handleCompose = () => {
    setIsComposing(true);
    // TODO: Open post composer modal/sheet
    console.log('Open post composer');
  };

  const handleAddPhoto = () => {
    console.log('Add photo to post');
    // TODO: Open photo picker
  };

  return (
    <div className="p-4 bg-white border-b">
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user?.avatar || undefined} alt={user?.displayName || 'You'} />
          <AvatarFallback>
            {user?.displayName?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          onClick={handleCompose}
          className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-xl text-gray-500 hover:bg-gray-200 justify-start"
        >
          คุณคิดอะไรอยู่...
        </Button>
        <Button
          variant="ghost"
          onClick={handleAddPhoto}
          className="p-3 text-[hsl(207,90%,54%)] hover:bg-blue-50"
        >
          <Camera className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
