import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft, Phone } from 'lucide-react';
import { NAV, CTA, PAGES } from '@/lib/constants/text';

export default function NotFound() {
  return (
    <div className='container flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center'>
      <div className='flex flex-col items-center gap-6 max-w-md'>
        <div className='text-8xl sm:text-9xl font-bold text-primary/20'>{PAGES.NOT_FOUND.CODE}</div>

        <div className='flex flex-col gap-3'>
          <h1 className='text-2xl sm:text-3xl font-bold'>{PAGES.NOT_FOUND.TITLE}</h1>
          <p className='text-muted-foreground text-sm sm:text-base leading-relaxed'>{PAGES.NOT_FOUND.DESCRIPTION}</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2'>
          <Button asChild className='w-full sm:w-auto'>
            <Link href='/'>
              <Home className='h-4 w-4' />
              {PAGES.NOT_FOUND.GO_HOME}
            </Link>
          </Button>
          <Button variant='outline' asChild className='w-full sm:w-auto'>
            <Link href='/services'>
              <ArrowLeft className='h-4 w-4' />
              {NAV.SERVICES}
            </Link>
          </Button>
          <Button variant='outline' asChild className='w-full sm:w-auto'>
            <Link href='/contacts'>
              <Phone className='h-4 w-4' />
              {CTA.CONTACT_US}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
