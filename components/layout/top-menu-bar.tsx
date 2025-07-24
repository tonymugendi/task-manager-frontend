import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Search, 
  Bell, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopMenuBarProps {
  title?: string;
}

export function TopMenuBar({ title }: TopMenuBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Get page title from router or prop
  const getPageTitle = () => {
    if (title) return title;
    
    const path = router.pathname;
    const titleMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/tasks': 'Tasks',
      '/boards': 'Boards',
      '/calendar': 'Calendar',
      '/team': 'Team',
      '/analytics': 'Analytics',
      '/archive': 'Archive',
    };
    
    return titleMap[path] || 'Task Manager';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Sidebar Trigger & Title */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
            <p className="text-sm text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tasks, projects, or team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-2">

          {/* Search Button for Mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => router.push('/search')}
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2"
            onClick={() => router.push('/notifications')}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
