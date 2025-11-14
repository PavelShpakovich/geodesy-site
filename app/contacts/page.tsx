import { getCompanyInfo, getSeoData } from '@/lib/contentful/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { YandexMap } from '@/components/map/YandexMap';
import { PAGES, NAV, COMPANY_INFO, MESSENGERS } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateContactsMetadata, SEO_CONFIG } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

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

  // Generate structured data
  const structuredData = [
    generateLocalBusinessSchema(companyInfo, SEO_CONFIG.SITE_URL),
    generateBreadcrumbSchema(
      [
        { name: NAV.HOME, url: '/' },
        { name: NAV.CONTACTS, url: '/contacts' },
      ],
      SEO_CONFIG.SITE_URL
    ),
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <div className='container py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6'>
        <div className='mx-auto max-w-2xl text-center mb-12 sm:mb-16'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3 sm:mb-4'>
            {PAGES.CONTACTS.TITLE}
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground'>{PAGES.CONTACTS.SUBTITLE}</p>
        </div>

        <div className='grid gap-8 sm:gap-12 lg:grid-cols-2'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold mb-5 sm:mb-6'>{PAGES.CONTACTS.INFO_TITLE}</h2>

            <div className='space-y-4 sm:space-y-6'>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-3'>
                    <Phone className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
                    <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.PHONE}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={`tel:${companyInfo.fields.phone}`}
                    className='text-base sm:text-lg font-medium hover:text-primary transition-colors'
                  >
                    {companyInfo.fields.phone}
                  </a>
                </CardContent>
              </Card>

              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-3'>
                    <Mail className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
                    <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.EMAIL}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={`mailto:${companyInfo.fields.email}`}
                    className='text-base sm:text-lg font-medium hover:text-primary transition-colors break-all'
                  >
                    {companyInfo.fields.email}
                  </a>
                </CardContent>
              </Card>

              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-3'>
                    <MapPin className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
                    <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.ADDRESS}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-base sm:text-lg'>{companyInfo.fields.address}</p>
                </CardContent>
              </Card>

              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-3'>
                    <Clock className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
                    <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.WORK_HOURS}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-base sm:text-lg whitespace-pre-line'>{companyInfo.fields.workHours}</p>
                </CardContent>
              </Card>

              {(companyInfo.fields.telegram || companyInfo.fields.viber || companyInfo.fields.whatsapp) && (
                <Card className='hover:shadow-lg transition-shadow'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.MESSENGERS}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-3'>
                      {companyInfo.fields.telegram && (
                        <Button variant='outline' size='sm' asChild className='flex-1 sm:flex-initial'>
                          <a
                            href={`https://t.me/${companyInfo.fields.telegram}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Send className='mr-2 h-4 w-4' />
                            {MESSENGERS.TELEGRAM}
                          </a>
                        </Button>
                      )}
                      {companyInfo.fields.viber && (
                        <Button variant='outline' size='sm' asChild className='flex-1 sm:flex-initial'>
                          <a href={`viber://chat?number=${companyInfo.fields.viber}`}>
                            <Phone className='mr-2 h-4 w-4' />
                            {MESSENGERS.VIBER}
                          </a>
                        </Button>
                      )}
                      {companyInfo.fields.whatsapp && (
                        <Button variant='outline' size='sm' asChild className='flex-1 sm:flex-initial'>
                          <a
                            href={`https://wa.me/${companyInfo.fields.whatsapp}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <MessageCircle className='mr-2 h-4 w-4' />
                            {MESSENGERS.WHATSAPP}
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div>
            <h2 className='text-xl sm:text-2xl font-bold mb-5 sm:mb-6'>{PAGES.CONTACTS.FORM_TITLE}</h2>
            <ContactForm />
          </div>
        </div>

        <div className='mt-12 sm:mt-16'>
          <h2 className='text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-center'>{PAGES.CONTACTS.MAP_TITLE}</h2>
          {companyInfo.fields.latitude && companyInfo.fields.longitude ? (
            <YandexMap
              address={companyInfo.fields.address}
              center={[companyInfo.fields.latitude, companyInfo.fields.longitude]}
              zoom={16}
            />
          ) : (
            <div className='bg-muted rounded-lg h-64 sm:h-80 md:h-96 flex items-center justify-center'>
              <div className='text-center text-muted-foreground px-4'>
                <MapPin className='h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4' />
                <p className='text-sm sm:text-base'>{PAGES.CONTACTS.MAP_PLACEHOLDER}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
