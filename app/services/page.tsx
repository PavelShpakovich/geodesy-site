import { getServices, getSeoData, getCompanyInfo } from '@/lib/contentful/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { CTA, PAGES, NAV } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateServicesMetadata, SEO_CONFIG } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData('services');
  return generateServicesMetadata(seoData);
}

export default async function ServicesPage() {
  const [services, companyInfo] = await Promise.all([getServices(), getCompanyInfo()]);

  // Generate structured data
  const structuredData = [
    generateBreadcrumbSchema(
      [
        { name: NAV.HOME, url: '/' },
        { name: NAV.SERVICES, url: '/services' },
      ],
      SEO_CONFIG.SITE_URL
    ),
    // Add service schemas for each service
    ...services
      .map((service) =>
        companyInfo
          ? generateServiceSchema(service.fields.title, service.fields.description, companyInfo, SEO_CONFIG.SITE_URL)
          : null
      )
      .filter(Boolean),
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <div className='container py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6'>
        <div className='mx-auto max-w-2xl text-center mb-10 sm:mb-12 lg:mb-16'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>{PAGES.SERVICES.TITLE}</h1>
          <p className='mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground'>{PAGES.SERVICES.SUBTITLE}</p>
        </div>

        {services.length > 0 && (
          <div className='grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12 sm:mb-16'>
            {services.map((service) => (
              <Card
                key={service.sys.id}
                className='hover:shadow-lg transition-all hover:scale-[1.02] duration-300 overflow-hidden p-0'
              >
                {service.fields.image?.fields?.file?.url && (
                  <div className='relative w-full h-48 overflow-hidden'>
                    <Image
                      src={`https:${service.fields.image.fields.file.url}`}
                      alt={service.fields.image.fields.title || service.fields.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />
                  </div>
                )}
                <div className='flex flex-col gap-4 p-6'>
                  <CardHeader>
                    <CardTitle className='text-xl sm:text-2xl'>{service.fields.title}</CardTitle>
                    {service.fields.price && (
                      <div className='text-lg sm:text-xl font-semibold text-primary'>{service.fields.price}</div>
                    )}
                  </CardHeader>
                  <CardContent className='flex-1'>
                    <CardDescription className='text-sm sm:text-base whitespace-pre-line leading-relaxed'>
                      {service.fields.description}
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className='mt-12 sm:mt-16 bg-muted/50 rounded-lg p-6 sm:p-8 text-center'>
          <h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>{PAGES.SERVICES.CTA_TITLE}</h2>
          <p className='text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6'>{PAGES.SERVICES.CTA_SUBTITLE}</p>
          <Button size='lg' asChild className='w-full sm:w-auto'>
            <Link href='/contacts'>
              <Phone className='mr-2 h-4 w-4' />
              {CTA.CONTACT_US}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
