import { getCompanyInfo, getAdvantages, getSeoData } from '@/lib/contentful/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { CTA, PAGES, NAV, COMPANY_INFO, MESSENGERS } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateAboutMetadata, SEO_CONFIG } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';
import Link from 'next/link';

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

  // Generate structured data
  const structuredData = [
    generateOrganizationSchema(companyInfo, SEO_CONFIG.SITE_URL),
    generateBreadcrumbSchema(
      [
        { name: NAV.HOME, url: '/' },
        { name: NAV.ABOUT, url: '/about' },
      ],
      SEO_CONFIG.SITE_URL
    ),
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <div className='container py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6'>
        <div className='mx-auto max-w-3xl text-center mb-12 sm:mb-16'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 sm:mb-6'>
            {companyInfo.fields.name}
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground whitespace-pre-line leading-relaxed'>
            {companyInfo.fields.description}
          </p>
        </div>

        <div className='grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12 sm:mb-16'>
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='pb-3'>
              <Phone className='h-6 w-6 sm:h-8 sm:w-8 mb-2 text-primary' />
              <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.PHONE}</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`tel:${companyInfo.fields.phone}`}
                className='text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors font-medium'
              >
                {companyInfo.fields.phone}
              </a>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='pb-3'>
              <Mail className='h-6 w-6 sm:h-8 sm:w-8 mb-2 text-primary' />
              <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.EMAIL}</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`mailto:${companyInfo.fields.email}`}
                className='text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all font-medium'
              >
                {companyInfo.fields.email}
              </a>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='pb-3'>
              <MapPin className='h-6 w-6 sm:h-8 sm:w-8 mb-2 text-primary' />
              <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.ADDRESS}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm sm:text-base text-muted-foreground'>{companyInfo.fields.address}</p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='pb-3'>
              <Clock className='h-6 w-6 sm:h-8 sm:w-8 mb-2 text-primary' />
              <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.WORK_HOURS}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm sm:text-base text-muted-foreground whitespace-pre-line'>
                {companyInfo.fields.workHours}
              </p>
            </CardContent>
          </Card>
        </div>

        {advantages.length > 0 && (
          <div className='mb-12 sm:mb-16'>
            <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12'>{PAGES.ABOUT.TITLE_ADVANTAGES}</h2>
            <div className='grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {advantages.map((advantage) => (
                <Card key={advantage.sys.id} className='hover:shadow-lg transition-all hover:scale-[1.02] duration-300'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-lg sm:text-xl'>{advantage.fields.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                      {advantage.fields.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {(companyInfo.fields.telegram || companyInfo.fields.viber || companyInfo.fields.whatsapp) && (
          <div className='bg-muted/50 rounded-lg p-6 sm:p-8 mb-12 sm:mb-16'>
            <h3 className='text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6'>{PAGES.ABOUT.MESSENGERS_TITLE}</h3>
            <div className='flex flex-wrap justify-center gap-3 sm:gap-4'>
              {companyInfo.fields.telegram && (
                <Button variant='outline' asChild className='w-full sm:w-auto'>
                  <a href={`https://t.me/${companyInfo.fields.telegram}`} target='_blank' rel='noopener noreferrer'>
                    <Send className='mr-2 h-4 w-4' />
                    {MESSENGERS.TELEGRAM}
                  </a>
                </Button>
              )}
              {companyInfo.fields.viber && (
                <Button variant='outline' asChild className='w-full sm:w-auto'>
                  <a href={`viber://chat?number=${companyInfo.fields.viber}`}>
                    <Phone className='mr-2 h-4 w-4' />
                    {MESSENGERS.VIBER}
                  </a>
                </Button>
              )}
              {companyInfo.fields.whatsapp && (
                <Button variant='outline' asChild className='w-full sm:w-auto'>
                  <a href={`https://wa.me/${companyInfo.fields.whatsapp}`} target='_blank' rel='noopener noreferrer'>
                    <MessageCircle className='mr-2 h-4 w-4' />
                    {MESSENGERS.WHATSAPP}
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        <div className='bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 text-center'>
          <h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>{PAGES.ABOUT.CTA_TITLE}</h2>
          <p className='text-sm sm:text-base mb-5 sm:mb-6 opacity-90'>{PAGES.ABOUT.CTA_SUBTITLE}</p>
          <Button size='lg' variant='secondary' asChild className='w-full sm:w-auto'>
            <Link href='/contacts'>{CTA.CONTACT_US}</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
