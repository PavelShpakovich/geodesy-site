import { getCompanyInfo, getAdvantages, getServices, getSeoData } from '@/lib/contentful/api';
import { Hero } from '@/components/sections/Hero';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateHomeMetadata, SEO_CONFIG } from '@/lib/seo/metadata';
import {
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: preview } = await draftMode();
  const seoData = await getSeoData('home', preview);
  return generateHomeMetadata(seoData);
}

export default async function Home() {
  const { isEnabled: preview } = await draftMode();
  const [companyInfo, advantages, services] = await Promise.all([
    getCompanyInfo(preview),
    getAdvantages(preview),
    getServices(preview),
  ]);

  // Generate structured data for SEO
  const structuredData = companyInfo
    ? [
        generateLocalBusinessSchema(companyInfo, SEO_CONFIG.SITE_URL),
        generateWebSiteSchema(SEO_CONFIG.SITE_URL, SEO_CONFIG.SITE_NAME),
        generateBreadcrumbSchema([{ name: 'Главная', url: '/' }], SEO_CONFIG.SITE_URL),
      ]
    : [];

  return (
    <>
      {structuredData.length > 0 && <StructuredData data={structuredData} />}
      <Hero companyInfo={companyInfo} />
      <AdvantagesSection advantages={advantages} />
      <ServicesPreview services={services} limit={3} />
      <ContactCTA companyInfo={companyInfo} />
    </>
  );
}
