import { createContext, useContext, useState, ReactNode } from 'react';

type Tab = 'chat' | 'posts' | 'friends' | 'profile';

interface AppContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
