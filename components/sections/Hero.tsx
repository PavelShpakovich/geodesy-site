import Link from 'next/link';
import Image from 'next/image';
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

  // Get Contentful image URLs
  const heroDesktopUrl = companyInfo.fields.heroImageDesktop?.fields?.file?.url;
  const heroMobileUrl = companyInfo.fields.heroImageMobile?.fields?.file?.url;

  const desktopSrc = heroDesktopUrl ? `https:${heroDesktopUrl}` : null;
  const mobileSrc = heroMobileUrl ? `https:${heroMobileUrl}` : null;

  return (
    <section className='relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] xl:min-h-[65vh] flex items-center'>
      {desktopSrc && (
        <div className='absolute inset-0 -z-20 hidden lg:block'>
          <Image
            src={desktopSrc}
            alt='Геодезические работы в Бресте'
            fill
            priority
            fetchPriority='high'
            className='object-cover object-right'
            sizes='100vw'
            quality={90}
          />
          <div className='absolute inset-0 bg-background/80 dark:bg-background/95' />
        </div>
      )}

      {mobileSrc && (
        <div className='absolute inset-0 -z-20 block lg:hidden'>
          <Image
            src={mobileSrc}
            alt='Геодезические работы в Бресте'
            fill
            priority
            fetchPriority='high'
            className='object-cover object-top'
            sizes='100vw'
            quality={70}
          />
          <div className='absolute inset-0 bg-background/85 dark:bg-background/95' />
        </div>
      )}

      <div className='container relative z-10'>
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
    </section>
  );
}
