'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NAV, CTA } from '@/lib/constants/text';
import { useClickOutside } from '@/hooks/useClickOutside';

interface HeaderProps {
  companyName: string;
  companyPhone?: string;
}

export function HeaderClient({ companyName, companyPhone }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false), mobileMenuOpen);

  return (
    <header
      className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'
      ref={mobileMenuRef}
    >
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center gap-2 transition-opacity hover:opacity-80'>
          <Logo showText={false} />
          <span className='text-lg md:text-xl font-bold'>{companyName}</span>
        </Link>

        <nav className='hidden md:flex items-center gap-6'>
          <Link href='/' className='text-sm font-medium transition-colors hover:text-primary'>
            {NAV.HOME}
          </Link>
          <Link href='/services' className='text-sm font-medium transition-colors hover:text-primary'>
            {NAV.SERVICES}
          </Link>
          <Link href='/about' className='text-sm font-medium transition-colors hover:text-primary'>
            {NAV.ABOUT}
          </Link>
          <Link href='/contacts' className='text-sm font-medium transition-colors hover:text-primary'>
            {NAV.CONTACTS}
          </Link>
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className='md:hidden border-t bg-background/98 backdrop-blur-lg'>
          <nav className='container py-4 flex flex-col gap-3'>
            <Link
              href='/'
              className='px-4 py-2 text-base font-medium transition-colors hover:bg-accent rounded-md'
              onClick={() => setMobileMenuOpen(false)}
            >
              {NAV.HOME}
            </Link>
            <Link
              href='/services'
              className='px-4 py-2 text-base font-medium transition-colors hover:bg-accent rounded-md'
              onClick={() => setMobileMenuOpen(false)}
            >
              {NAV.SERVICES}
            </Link>
            <Link
              href='/about'
              className='px-4 py-2 text-base font-medium transition-colors hover:bg-accent rounded-md'
              onClick={() => setMobileMenuOpen(false)}
            >
              {NAV.ABOUT}
            </Link>
            <Link
              href='/contacts'
              className='px-4 py-2 text-base font-medium transition-colors hover:bg-accent rounded-md'
              onClick={() => setMobileMenuOpen(false)}
            >
              {NAV.CONTACTS}
            </Link>

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
              <Button asChild className='w-full' onClick={() => setMobileMenuOpen(false)}>
                <Link href='/contacts'>{CTA.ORDER}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
