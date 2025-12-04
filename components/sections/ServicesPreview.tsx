import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { SECTIONS, CTA } from '@/lib/constants/text';
import type { Service } from '@/lib/contentful/api';
import { ServiceCard } from '@/components/services/ServiceCard';

interface ServicesPreviewProps {
  services: Service[];
  limit?: number;
}

export function ServicesPreview({ services, limit = 3 }: ServicesPreviewProps) {
  const displayedServices = services.slice(0, limit);

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24'>
      <div className='container px-4 sm:px-6 flex flex-col gap-10 sm:gap-12'>
        <div className='mx-auto max-w-2xl text-center flex flex-col gap-3 sm:gap-4'>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{SECTIONS.SERVICES.TITLE}</h2>
          <p className='text-base sm:text-lg text-muted-foreground'>{SECTIONS.SERVICES.SUBTITLE}</p>
        </div>

        <div className='grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {displayedServices.map((service) => (
            <ServiceCard key={service.sys.id} service={service} variant='minimal' />
          ))}
        </div>

        <div className='text-center'>
          <Button size='lg' asChild className='w-full sm:w-auto'>
            <Link href='/services'>
              {CTA.VIEW_ALL_SERVICES}
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
