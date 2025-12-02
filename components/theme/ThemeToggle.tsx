'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { THEME, ARIA } from '@/lib/constants/text';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === THEME.LIGHT) {
      setTheme('dark');
    } else if (theme === THEME.DARK) {
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
    <Button variant='ghost' size='icon' className='h-9 w-9' onClick={cycleTheme} title={THEME.LABEL(theme)}>
      {theme === THEME.LIGHT && <Sun className='h-[1.2rem] w-[1.2rem] transition-transform hover:rotate-12' />}
      {theme === THEME.DARK && <Moon className='h-[1.2rem] w-[1.2rem] transition-transform hover:-rotate-12' />}
      {theme === THEME.SYSTEM && <Monitor className='h-[1.2rem] w-[1.2rem] transition-transform hover:scale-110' />}
      <span className='sr-only'>{ARIA.TOGGLE_THEME(theme)}</span>
    </Button>
  );
}
