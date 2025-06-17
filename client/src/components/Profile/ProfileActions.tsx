import { Edit, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfileActions() {
  const handleEditProfile = () => {
    console.log('Edit profile');
    // TODO: Open edit profile modal
  };

  const handleShareProfile = () => {
    console.log('Share profile');
    // TODO: Share profile functionality
  };

  return (
    <div className="p-4 bg-white border-b border-gray-100">
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleEditProfile}
          className="flex items-center justify-center space-x-2 p-3 bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)] text-white rounded-xl font-medium"
        >
          <Edit className="h-4 w-4" />
          <span>แก้ไขโปรไฟล์</span>
        </Button>
        <Button
          variant="secondary"
          onClick={handleShareProfile}
          className="flex items-center justify-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
        >
          <Share className="h-4 w-4" />
          <span>แชร์โปรไฟล์</span>
        </Button>
      </div>
    </div>
  );
}
