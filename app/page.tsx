import { getCompanyInfo, getAdvantages, getServices, getSeoData } from '@/lib/contentful/api';
import { Hero } from '@/components/sections/Hero';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateHomeMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';

// Revalidate every 24 hours
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData('home');
  return generateHomeMetadata(seoData);
}

export default async function Home() {
  const [companyInfo, advantages, services] = await Promise.all([getCompanyInfo(), getAdvantages(), getServices()]);

  const structuredData = structuredDataHelpers.forHomePage(companyInfo);

  return (
    <>
      {structuredData.length > 0 && <StructuredData data={structuredData} />}
      <Hero companyInfo={companyInfo} />
      <AdvantagesSection advantages={advantages} />
      <ServicesPreview services={services} limit={3} />
      <ProcessSection className='container py-12 sm:py-16' />
      <ContactCTA companyInfo={companyInfo} />
    </>
  );
}
