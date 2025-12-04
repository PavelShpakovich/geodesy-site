import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Clock } from 'lucide-react';
import { CTA, PAGES, ALT_TEXTS } from '@/lib/constants/text';
import type { Service } from '@/lib/contentful/api';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { getAssetUrl } from '@/lib/contentful/client';

export interface ServiceCardProps {
  service: Service;
  /**
   * full: With image, all details, two buttons
   * compact: No image, description + two buttons
   * minimal: No image, only title + price + single "More details" button
   */
  variant?: 'full' | 'compact' | 'minimal';
  className?: string;
}

export function ServiceCard({ service, variant = 'full', className }: ServiceCardProps) {
  const imageUrl = getAssetUrl(service.fields.image);
  const href = `/services/${service.fields.slug}`;

  if (variant === 'minimal') {
    // Minimal: title + single CTA only
    return (
      <Card
        className={cn('hover:shadow-lg transition-shadow duration-300 overflow-hidden p-0 flex flex-col', className)}
      >
        <div className='flex flex-col gap-4 p-6 flex-1'>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl'>{service.fields.title}</CardTitle>
          </CardHeader>
          <div className='mt-auto'>
            <Button variant='outline' asChild className='w-full'>
              <Link href={href}>{PAGES.SERVICES.MORE_DETAILS}</Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    // Compact: no image, minimal info
    return (
      <Card
        className={cn('hover:shadow-lg transition-shadow duration-300 overflow-hidden p-0 flex flex-col', className)}
      >
        <div className='flex flex-col gap-4 p-6 flex-1'>
          <CardHeader>
            <CardTitle className='text-xl sm:text-2xl'>{service.fields.title}</CardTitle>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
              {service.fields.price && (
                <span className='text-lg sm:text-xl font-semibold text-primary'>{service.fields.price}</span>
              )}
              {service.fields.timeframe && (
                <span className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                  <Clock className='h-4 w-4' />
                  {service.fields.timeframe}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className='flex-1'>
            <CardDescription className='text-sm sm:text-base whitespace-pre-line leading-relaxed line-clamp-3'>
              {service.fields.description}
            </CardDescription>
          </CardContent>
          <div className='mt-auto pt-2 flex gap-2'>
            <Button variant='outline' asChild className='flex-1'>
              <Link href={href}>{PAGES.SERVICES.MORE_DETAILS}</Link>
            </Button>
            <Button asChild className='flex-1'>
              <Link href='/contacts'>{CTA.ORDER}</Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Full variant: with image, all details
  const imageAlt =
    service.fields.imageAltText ||
    service.fields.image?.fields?.title ||
    ALT_TEXTS.SERVICE_IMAGE_FALLBACK(service.fields.title);

  return (
    <Card className={cn('hover:shadow-lg transition-shadow duration-300 overflow-hidden p-0 flex flex-col', className)}>
      {imageUrl && (
        <div className='relative w-full h-48 overflow-hidden'>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />
        </div>
      )}
      <div className='flex flex-col gap-4 p-6 flex-1'>
        <CardHeader>
          <CardTitle className='text-xl sm:text-2xl'>{service.fields.title}</CardTitle>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
            {service.fields.price && (
              <span className='text-lg sm:text-xl font-semibold text-primary'>{service.fields.price}</span>
            )}
            {service.fields.timeframe && (
              <span className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                <Clock className='h-4 w-4' />
                {service.fields.timeframe}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className='flex-1'>
          <CardDescription className='text-sm sm:text-base whitespace-pre-line leading-relaxed'>
            {service.fields.description}
          </CardDescription>
        </CardContent>
        <div className='mt-auto pt-2 flex gap-2'>
          <Button variant='outline' asChild className='flex-1'>
            <Link href={href}>{PAGES.SERVICES.MORE_DETAILS}</Link>
          </Button>
          <Button asChild className='flex-1'>
            <Link href='/contacts'>{CTA.ORDER}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
