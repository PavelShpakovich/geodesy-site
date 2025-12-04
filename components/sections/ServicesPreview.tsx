import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { SECTIONS, CTA } from '@/lib/constants/text';
import type { Service } from '@/lib/contentful/api';

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
            <Card key={service.sys.id} className='hover:shadow-lg transition-shadow duration-300'>
              <CardHeader>
                <CardTitle className='text-lg sm:text-xl'>{service.fields.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-sm sm:text-base line-clamp-3 leading-relaxed'>
                  {service.fields.description}
                </CardDescription>
              </CardContent>
            </Card>
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
