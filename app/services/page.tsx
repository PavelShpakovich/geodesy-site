import { getServices, getCompanyInfo, getFAQs, getBlogPosts } from '@/lib/contentful/api';
import { Button } from '@/components/ui/Button';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Phone } from 'lucide-react';
import { PageHeader } from '@/components/sections/PageHeader';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTA, PAGES, SECTIONS } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateServicesMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';
import Link from 'next/link';

// Revalidate every 24 hours
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generateServicesMetadata();
}

export default async function ServicesPage() {
  const [services, companyInfo, faqs, blogPosts] = await Promise.all([
    getServices(),
    getCompanyInfo(),
    getFAQs(),
    getBlogPosts(),
  ]);

  const faqData = faqs.map((faq) => ({
    question: faq.fields.question,
    answer: faq.fields.answer,
  }));

  const structuredData = structuredDataHelpers.forServicesPage(companyInfo, services, faqData);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout>
        <PageHeader title={PAGES.SERVICES.TITLE} subtitle={PAGES.SERVICES.SUBTITLE} />

        {services.length > 0 && (
          <div className='grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {services.map((service) => (
              <ServiceCard key={service.sys.id} service={service} />
            ))}
          </div>
        )}
        <FAQSection faqs={faqData} />

        {blogPosts.length > 0 && (
          <section>
            <div className='text-center mb-8'>
              <h2 className='text-2xl sm:text-3xl font-bold mb-2'>{SECTIONS.BLOG_PREVIEW.TITLE}</h2>
              <p className='text-muted-foreground'>{SECTIONS.BLOG_PREVIEW.SUBTITLE}</p>
            </div>
            <div className='grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {blogPosts.slice(0, 3).map((post) => (
                <BlogPostCard key={post.sys.id} post={post} variant='compact' />
              ))}
            </div>
            <div className='text-center mt-6'>
              <Button variant='outline' asChild>
                <Link href='/blog'>{CTA.READ_MORE}</Link>
              </Button>
            </div>
          </section>
        )}

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
