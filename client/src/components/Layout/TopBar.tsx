import { Bell, Settings, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopBar() {
  return (
    <header className="bg-[hsl(207,90%,54%)] text-white p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <Fish className="text-[hsl(207,90%,54%)] text-lg" />
        </div>
        <h1 className="text-xl font-bold">SharkLine</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="relative text-white hover:bg-white/10">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-[hsl(0,84.2%,60.2%)] rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </Button>
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
