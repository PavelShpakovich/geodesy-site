import { getCompanyInfo, getAdvantages, getSeoData } from '@/lib/contentful/api';
import { Button } from '@/components/ui/button';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { SocialLinks } from '@/components/sections/SocialLinks';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { PageLayout } from '@/components/layout/PageLayout';
import { CTA, PAGES } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateAboutMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';
import Link from 'next/link';

// Revalidate every 24 hours
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData('about');
  return generateAboutMetadata(seoData);
}

export default async function AboutPage() {
  const [companyInfo, advantages] = await Promise.all([getCompanyInfo(), getAdvantages()]);

  if (!companyInfo) {
    return (
      <div className='container py-16'>
        <p className='text-center text-muted-foreground'>{PAGES.ABOUT.NO_INFO}</p>
      </div>
    );
  }

  const structuredData = structuredDataHelpers.forAboutPage(companyInfo);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout className='gap-12 sm:gap-16'>
        <div className='flex flex-col gap-4 sm:gap-6 mx-auto max-w-3xl text-center'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>{companyInfo.fields.name}</h1>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground whitespace-pre-line leading-relaxed'>
            {companyInfo.fields.description}
          </p>
        </div>

        <ContactInfo companyInfo={companyInfo} layout='grid' />

        {advantages.length > 0 && (
          <AdvantagesSection advantages={advantages} title={PAGES.ABOUT.TITLE_ADVANTAGES} subtitle='' />
        )}

        <div className='bg-muted/50 rounded-lg p-6 sm:p-8 flex flex-col items-center gap-4 sm:gap-6'>
          <h3 className='text-lg sm:text-xl font-bold text-center'>{PAGES.ABOUT.MESSENGERS_TITLE}</h3>
          <SocialLinks companyInfo={companyInfo} variant='buttons' className='justify-center' />
        </div>

        <div className='bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 text-center flex flex-col gap-5 sm:gap-6'>
          <h2 className='text-xl sm:text-2xl font-bold'>{PAGES.ABOUT.CTA_TITLE}</h2>
          <p className='text-sm sm:text-base opacity-90'>{PAGES.ABOUT.CTA_SUBTITLE}</p>
          <div>
            <Button size='lg' variant='secondary' asChild className='w-full sm:w-auto'>
              <Link href='/contacts'>{CTA.CONTACT_US}</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
