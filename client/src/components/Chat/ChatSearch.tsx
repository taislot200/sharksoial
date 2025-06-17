import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';

export function ChatSearch() {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className="p-4 bg-white border-b">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="ค้นหาแชท..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[hsl(207,90%,54%)]"
        />
      </div>
    </div>
  );
}
