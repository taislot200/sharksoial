import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';

export function FriendsSearch() {
  const { searchQuery, setSearchQuery } = useApp();
  const [activeFilter, setActiveFilter] = useState<'friends' | 'pending' | 'suggestions'>('friends');

  return (
    <div className="p-4 bg-white border-b">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="ค้นหาเพื่อน..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[hsl(207,90%,54%)]"
        />
      </div>
      <div className="flex space-x-2">
        <Button
          variant={activeFilter === 'friends' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveFilter('friends')}
          className={activeFilter === 'friends' ? 'bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)]' : ''}
        >
          เพื่อน
        </Button>
        <Button
          variant={activeFilter === 'pending' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveFilter('pending')}
          className={activeFilter === 'pending' ? 'bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)]' : ''}
        >
          ค้างอยู่
        </Button>
        <Button
          variant={activeFilter === 'suggestions' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setActiveFilter('suggestions')}
          className={activeFilter === 'suggestions' ? 'bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)]' : ''}
        >
          แนะนำ
        </Button>
      </div>
    </div>
  );
}
