import { MessageCircle, Home, Users, User, BookOpen } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

export function BottomNavigation() {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    { id: 'chat' as const, icon: MessageCircle, label: 'แชท' },
    { id: 'posts' as const, icon: Home, label: 'โพสต์' },
    { id: 'friends' as const, icon: Users, label: 'เพื่อน' },
    { id: 'profile' as const, icon: User, label: 'โปรไฟล์' },
    { id: 'docs' as const, icon: BookOpen, label: 'เอกสาร' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex flex-col items-center p-2 ${
                isActive 
                  ? 'text-[hsl(207,90%,54%)]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'docs') {
                  window.open('https://github.com/taislot200/sharksoial#readme', '_blank');
                }
              }}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
