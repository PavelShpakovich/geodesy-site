'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { NAV, CTA } from '@/lib/constants/text';

interface HeaderProps {
  companyName: string;
  companyPhone?: string;
}

export function HeaderClient({ companyName, companyPhone }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        {/* Logo and Company Name */}
        <Link href='/' className='flex items-center transition-opacity hover:opacity-80'>
          <Logo showText={false} />
          <span className='ml-2 text-lg md:text-xl font-bold'>{companyName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-6'>
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

        {/* Desktop CTA */}
        <div className='hidden md:flex items-center space-x-4'>
          {companyPhone && (
            <a
              href={`tel:${companyPhone}`}
              className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1'
            >
              <Phone className='h-4 w-4' />
              <span className='hidden lg:inline'>{companyPhone}</span>
            </a>
          )}
          <Button asChild size='sm'>
            <Link href='/contacts'>{CTA.ORDER}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 hover:bg-accent rounded-md transition-colors'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden border-t bg-background/98 backdrop-blur-lg'>
          <nav className='container py-4 flex flex-col space-y-3'>
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
