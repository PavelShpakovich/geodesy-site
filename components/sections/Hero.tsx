import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CTA } from '@/lib/constants/text';
import type { CompanyInfo } from '@/lib/contentful/api';

interface HeroProps {
  companyInfo: CompanyInfo | null;
}

export function Hero({ companyInfo }: HeroProps) {
  if (!companyInfo) {
    return null;
  }

  return (
    <section className='relative overflow-hidden bg-linear-to-b from-background via-background to-muted/30 py-12 sm:py-16 md:py-24 lg:py-32'>
      <div className='container'>
        <div className='mx-auto max-w-4xl text-center px-4 sm:px-6 flex flex-col gap-8 sm:gap-10'>
          <div className='flex flex-col gap-4 sm:gap-6'>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
              {companyInfo.fields.name}
            </h1>
            <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
              {companyInfo.fields.description}
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center px-4 sm:px-0'>
            <Button size='lg' asChild className='w-full sm:w-auto text-base'>
              <Link href='/contacts'>{CTA.ORDER_SERVICE}</Link>
            </Button>
            <Button size='lg' variant='outline' asChild className='w-full sm:w-auto text-base'>
              <Link href='/services'>{CTA.VIEW_SERVICES}</Link>
            </Button>
          </div>

          <div className='flex flex-col items-center gap-3 sm:gap-4 md:gap-8 text-sm sm:text-base sm:flex-row sm:justify-center'>
            <a
              href={`tel:${companyInfo.fields.phone}`}
              className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group'
            >
              <Phone size={18} className='group-hover:scale-110 transition-transform' />
              <span className='font-medium'>{companyInfo.fields.phone}</span>
            </a>

            <span className='hidden sm:inline text-muted-foreground/50'>•</span>

            <a
              href={`mailto:${companyInfo.fields.email}`}
              className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group'
            >
              <Mail size={18} className='group-hover:scale-110 transition-transform' />
              <span className='font-medium break-all'>{companyInfo.fields.email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className='absolute top-0 right-0 -z-10 transform-gpu blur-3xl' aria-hidden='true'>
        <div className='aspect-1155/678 w-144.5 bg-linear-to-tr from-primary/20 to-primary/5 opacity-30' />
      </div>
      <div className='absolute bottom-0 left-0 -z-10 transform-gpu blur-3xl' aria-hidden='true'>
        <div className='aspect-1155/678 w-144.5 bg-linear-to-tr from-primary/20 to-primary/5 opacity-30' />
      </div>
    </section>
  );
}
