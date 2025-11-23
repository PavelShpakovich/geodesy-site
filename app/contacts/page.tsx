import { getCompanyInfo, getSeoData } from '@/lib/contentful/api';
import { MapPin } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { YandexMap } from '@/components/map/YandexMap';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { SocialLinks } from '@/components/sections/SocialLinks';
import { LegalInfo } from '@/components/sections/LegalInfo';
import { PageLayout } from '@/components/layout/PageLayout';
import { PAGES } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateContactsMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';

// Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData('contacts');
  return generateContactsMetadata(seoData);
}

export default async function ContactsPage() {
  const companyInfo = await getCompanyInfo();

  if (!companyInfo) {
    return (
      <div className='container py-16'>
        <p className='text-center text-muted-foreground'>{PAGES.CONTACTS.NO_INFO}</p>
      </div>
    );
  }

  const structuredData = structuredDataHelpers.forContactsPage(companyInfo);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout className='gap-12 sm:gap-16'>
        <PageHeader title={PAGES.CONTACTS.TITLE} subtitle={PAGES.CONTACTS.SUBTITLE} />

        <div className='grid gap-8 sm:gap-12 lg:grid-cols-2'>
          <div className='flex flex-col gap-6 sm:gap-8'>
            <div>
              <h2 className='text-xl sm:text-2xl font-bold mb-5 sm:mb-6'>{PAGES.CONTACTS.INFO_TITLE}</h2>
              <ContactInfo companyInfo={companyInfo} layout='stacked' />
            </div>

            <SocialLinks companyInfo={companyInfo} variant='card' />

            <LegalInfo companyInfo={companyInfo} />
          </div>

          <div>
            <h2 className='text-xl sm:text-2xl font-bold mb-5 sm:mb-6'>{PAGES.CONTACTS.FORM_TITLE}</h2>
            <ContactForm />
          </div>
        </div>

        <div className='flex flex-col gap-5 sm:gap-6'>
          <h2 className='text-xl sm:text-2xl font-bold text-center'>{PAGES.CONTACTS.MAP_TITLE}</h2>
          {companyInfo.fields.latitude && companyInfo.fields.longitude ? (
            <YandexMap
              address={companyInfo.fields.address}
              center={[companyInfo.fields.latitude, companyInfo.fields.longitude]}
              zoom={16}
            />
          ) : (
            <div className='bg-muted rounded-lg h-64 sm:h-80 md:h-96 flex items-center justify-center'>
              <div className='text-center text-muted-foreground px-4 flex flex-col gap-3 sm:gap-4'>
                <MapPin className='h-10 w-10 sm:h-12 sm:w-12 mx-auto' />
                <p className='text-sm sm:text-base'>{PAGES.CONTACTS.MAP_PLACEHOLDER}</p>
              </div>
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
}
