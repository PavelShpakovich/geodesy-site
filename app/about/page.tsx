import { getCompanyInfo, getSeoData, getPersonalInfo, getReviews } from '@/lib/contentful/api';
import { transformPersonalInfo, transformReviews } from '@/lib/contentful/transformers';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/sections/SocialLinks';
import { PageLayout } from '@/components/layout/PageLayout';
import { CTA, PAGES } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateAboutMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  OwnerIntroSection,
  StatsSection,
  CredentialsSection,
  EquipmentSection,
  ReviewsSection,
} from '@/components/sections/about';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData('about');
  return generateAboutMetadata(seoData);
}

export default async function AboutPage() {
  const [companyInfo, personalInfo, reviews] = await Promise.all([getCompanyInfo(), getPersonalInfo(), getReviews()]);

  if (!companyInfo) {
    return (
      <div className='container py-16'>
        <p className='text-center text-muted-foreground'>{PAGES.ABOUT.NO_INFO}</p>
      </div>
    );
  }

  const transformedInfo = personalInfo ? transformPersonalInfo(personalInfo) : null;
  const transformedReviews = transformReviews(reviews);
  const structuredData = structuredDataHelpers.forAboutPage(companyInfo);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout className='gap-12 sm:gap-16'>
        {transformedInfo && <OwnerIntroSection owner={transformedInfo.owner} showPhoto={transformedInfo.hasPhoto} />}

        {transformedInfo?.hasStats && (
          <div className='bg-muted/30 rounded-2xl p-6 sm:p-8'>
            <StatsSection stats={transformedInfo.stats} />
          </div>
        )}

        {transformedInfo?.hasCredentials && <CredentialsSection credentials={transformedInfo.credentials} />}

        {transformedInfo?.hasEquipment && (
          <div className='bg-muted/30 rounded-2xl p-6 sm:p-8'>
            <EquipmentSection equipment={transformedInfo.equipment} />
          </div>
        )}

        {transformedReviews.length > 0 && <ReviewsSection reviews={transformedReviews} />}

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
