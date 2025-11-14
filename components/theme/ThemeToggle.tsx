'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  if (!mounted) {
    return (
      <Button variant='ghost' size='icon' className='h-9 w-9' disabled>
        <Sun className='h-[1.2rem] w-[1.2rem]' />
      </Button>
    );
  }

  return (
    <Button variant='ghost' size='icon' className='h-9 w-9' onClick={cycleTheme} title={`Тема: ${theme}`}>
      {theme === 'light' && <Sun className='h-[1.2rem] w-[1.2rem] transition-transform hover:rotate-12' />}
      {theme === 'dark' && <Moon className='h-[1.2rem] w-[1.2rem] transition-transform hover:-rotate-12' />}
      {theme === 'system' && <Monitor className='h-[1.2rem] w-[1.2rem] transition-transform hover:scale-110' />}
      <span className='sr-only'>Переключить тему (текущая: {theme})</span>
    </Button>
  );
}
