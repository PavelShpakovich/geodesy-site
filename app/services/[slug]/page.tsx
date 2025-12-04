import { getServiceBySlug, getAllServiceSlugs, getCompanyInfo, getServices } from '@/lib/contentful/api';
import { getAssetUrl } from '@/lib/contentful/client';
import { renderRichText } from '@/lib/contentful/rich-text';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Phone, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CTA, PAGES, ALT_TEXTS } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateServicePageMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Revalidate every 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: PAGES.SERVICES.NOT_FOUND,
    };
  }

  return generateServicePageMetadata({
    title: service.fields.title,
    description: service.fields.description,
    metaDescription: service.fields.metaDescription,
    slug: service.fields.slug,
    image: service.fields.image,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, companyInfo, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getCompanyInfo(),
    getServices(),
  ]);

  if (!service) {
    notFound();
  }

  const structuredData = structuredDataHelpers.forServicePage(service, companyInfo);

  // Get related services (excluding current one)
  const relatedServices = allServices.filter((s) => s.sys.id !== service.sys.id).slice(0, 3);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout className='gap-8 sm:gap-12'>
        <div>
          <Button variant='ghost' size='sm' asChild className='gap-2'>
            <Link href='/services'>
              <ArrowLeft className='h-4 w-4' />
              {CTA.BACK_TO_SERVICES}
            </Link>
          </Button>
        </div>

        <article className='max-w-4xl mx-auto w-full'>
          <header className='mb-8'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4'>{service.fields.title}</h1>

            <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
              {service.fields.price && (
                <span className='text-2xl sm:text-3xl font-bold text-primary'>{service.fields.price}</span>
              )}
              {service.fields.timeframe && (
                <span className='flex items-center gap-2 text-muted-foreground'>
                  <Clock className='h-5 w-5' />
                  {service.fields.timeframe}
                </span>
              )}
            </div>
          </header>

          {getAssetUrl(service.fields.image) && (
            <div className='relative w-full aspect-video rounded-lg overflow-hidden mb-8'>
              <Image
                src={getAssetUrl(service.fields.image)}
                alt={
                  service.fields.imageAltText ||
                  service.fields.image?.fields?.title ||
                  ALT_TEXTS.SERVICE_IMAGE_FALLBACK(service.fields.title)
                }
                fill
                priority
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 800px'
              />
            </div>
          )}

          <div className='prose prose-lg dark:prose-invert max-w-none mb-8'>
            {service.fields.fullDescription ? (
              renderRichText(service.fields.fullDescription)
            ) : (
              <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed whitespace-pre-line'>
                {service.fields.description}
              </p>
            )}
          </div>

          <div className='bg-muted/30 rounded-lg p-6 sm:p-8 mb-8'>
            <h2 className='text-xl font-semibold mb-4'>{PAGES.SERVICES.WHATS_INCLUDED}</h2>
            <ul className='space-y-3'>
              {PAGES.SERVICES.INCLUDED_ITEMS.map((item, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <CheckCircle className='h-5 w-5 text-primary mt-0.5 shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 text-center flex flex-col gap-5 sm:gap-6'>
            <h2 className='text-xl sm:text-2xl font-bold'>{PAGES.SERVICES.CTA_ORDER}</h2>
            <p className='text-sm sm:text-base opacity-90'>{PAGES.SERVICES.CTA_CONSULTATION}</p>
            <div>
              <Button size='lg' variant='secondary' asChild className='w-full sm:w-auto'>
                <Link href='/contacts'>
                  <Phone className='mr-2 h-4 w-4' />
                  {CTA.CONTACT_US}
                </Link>
              </Button>
            </div>
          </div>
        </article>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className='max-w-4xl mx-auto w-full'>
            <h2 className='text-2xl font-bold mb-6'>{PAGES.SERVICES.RELATED}</h2>
            <div className='flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide'>
              {relatedServices.map((relatedService) => (
                <ServiceCard
                  key={relatedService.sys.id}
                  service={relatedService}
                  variant='compact'
                  className='w-[280px] sm:w-[300px] shrink-0 snap-start'
                />
              ))}
            </div>
          </section>
        )}
      </PageLayout>
    </>
  );
}
