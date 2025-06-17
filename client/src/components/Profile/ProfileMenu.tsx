import { 
  Shield, Bell, Palette, Languages, HelpCircle, 
  Info, LogOut, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function ProfileMenu() {
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "ออกจากระบบแล้ว",
        description: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถออกจากระบบได้",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      title: 'การตั้งค่า',
      items: [
        { icon: Shield, label: 'ความเป็นส่วนตัว', action: () => console.log('Privacy settings') },
        { icon: Bell, label: 'การแจ้งเตือน', action: () => console.log('Notification settings') },
        { icon: Palette, label: 'ธีม', action: () => console.log('Theme settings') },
        { icon: Languages, label: 'ภาษา', action: () => console.log('Language settings') },
      ]
    },
    {
      title: 'ข้อมูลและการสนับสนุน',
      items: [
        { icon: HelpCircle, label: 'ศูนย์ช่วยเหลือ', action: () => console.log('Help center') },
        { icon: Info, label: 'เกี่ยวกับแอป', action: () => console.log('About app') },
      ]
    }
  ];

  return (
    <div className="bg-white">
      {menuItems.map((section, sectionIndex) => (
        <div key={sectionIndex} className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
          <div className="space-y-1">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <Button
                  key={itemIndex}
                  variant="ghost"
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center justify-center space-x-3 p-3 text-[hsl(0,84.2%,60.2%)] hover:bg-red-50 rounded-lg"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">ออกจากระบบ</span>
        </Button>
      </div>
    </div>
  );
}
