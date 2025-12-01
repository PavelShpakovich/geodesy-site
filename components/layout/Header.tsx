'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { NAV, CTA } from '@/lib/constants/text';

interface HeaderProps {
  companyName: string;
  companyPhone?: string;
}

const NAV_ITEMS = [
  { href: '/', label: NAV.HOME },
  { href: '/services', label: NAV.SERVICES },
  { href: '/blog', label: NAV.BLOG },
  { href: '/about', label: NAV.ABOUT },
  { href: '/contacts', label: NAV.CONTACTS },
] as const;

export function HeaderClient({ companyName, companyPhone }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Trap focus in mobile menu when open
  useFocusTrap(mobileMenuRef, mobileMenuOpen);

  // Close menu on Escape key
  useEffect(() => {
    const menuElement = mobileMenuRef.current;
    if (!menuElement) return;

    menuElement.addEventListener('escape-key', closeMobileMenu);
    return () => menuElement.removeEventListener('escape-key', closeMobileMenu);
  }, [mobileMenuOpen]);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <Link
          href='/'
          onClick={closeMobileMenu}
          className='flex items-center gap-2 transition-opacity hover:opacity-80'
        >
          <Logo showText={false} />
          <span className='text-lg md:text-xl font-bold'>{companyName}</span>
        </Link>

        <nav className='hidden md:flex items-center gap-6'>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className='text-sm font-medium transition-colors hover:text-primary'>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='hidden md:flex items-center gap-4'>
          {companyPhone && (
            <a
              href={`tel:${companyPhone}`}
              className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1'
            >
              <Phone className='h-4 w-4' />
              <span className='hidden lg:inline'>{companyPhone}</span>
            </a>
          )}
          <ThemeToggle />
          <Button asChild size='sm'>
            <Link href='/contacts'>{CTA.ORDER}</Link>
          </Button>
        </div>

        <div className='flex md:hidden items-center gap-2'>
          <ThemeToggle />
          <button
            className='p-2 hover:bg-accent rounded-md transition-colors'
            onClick={toggleMobileMenu}
            aria-label='Toggle menu'
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className='absolute w-full md:hidden border-t bg-background/98 backdrop-blur-lg'>
          <nav className='container py-4 flex flex-col gap-3'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='px-4 py-2 text-base font-medium transition-colors hover:bg-accent rounded-md'
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {companyPhone && (
              <a
                href={`tel:${companyPhone}`}
                className='px-4 py-2 text-base font-medium text-muted-foreground hover:bg-accent rounded-md flex items-center gap-2'
              >
                <Phone className='h-4 w-4' />
                {companyPhone}
              </a>
            )}

            <div className='px-4 pt-2'>
              <Button asChild className='w-full' onClick={closeMobileMenu}>
                <Link href='/contacts'>{CTA.ORDER}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
