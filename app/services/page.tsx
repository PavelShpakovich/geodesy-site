import { getServices, getSeoData, getCompanyInfo } from '@/lib/contentful/api';
import { getAssetUrl } from '@/lib/contentful/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Phone, Clock } from 'lucide-react';
import { PageHeader } from '@/components/sections/PageHeader';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTA, PAGES } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateServicesMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// Revalidate every 24 hours
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData('services');
  return generateServicesMetadata(seoData);
}

export default async function ServicesPage() {
  const [services, companyInfo] = await Promise.all([getServices(), getCompanyInfo()]);

  const structuredData = structuredDataHelpers.forServicesPage(companyInfo, services);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout>
        <PageHeader title={PAGES.SERVICES.TITLE} subtitle={PAGES.SERVICES.SUBTITLE} />

        {services.length > 0 && (
          <div className='grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {services.map((service) => (
              <Card
                key={service.sys.id}
                className='hover:shadow-lg transition-shadow duration-300 overflow-hidden p-0 flex flex-col'
              >
                {getAssetUrl(service.fields.image) && (
                  <div className='relative w-full h-48 overflow-hidden'>
                    <Image
                      src={getAssetUrl(service.fields.image)}
                      alt={service.fields.image?.fields?.title || service.fields.title}
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
                  <div className='mt-auto pt-2'>
                    <Button asChild className='w-full'>
                      <Link href='/contacts'>{CTA.ORDER_SERVICE}</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <ProcessSection />

        <div className='bg-muted/50 rounded-lg p-6 sm:p-8 text-center flex flex-col gap-5 sm:gap-6'>
          <h2 className='text-xl sm:text-2xl font-bold'>{PAGES.SERVICES.CTA_TITLE}</h2>
          <p className='text-sm sm:text-base text-muted-foreground'>{PAGES.SERVICES.CTA_SUBTITLE}</p>
          <div>
            <Button size='lg' asChild className='w-full sm:w-auto'>
              <Link href='/contacts'>
                <Phone className='mr-2 h-4 w-4' />
                {CTA.CONTACT_US}
              </Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
