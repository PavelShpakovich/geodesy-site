import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CTA, CONTACT_CTA, COMPANY_INFO } from '@/lib/constants/text';
import type { CompanyInfo } from '@/lib/contentful/api';

interface ContactCTAProps {
  companyInfo: CompanyInfo | null;
}

export function ContactCTA({ companyInfo }: ContactCTAProps) {
  if (!companyInfo) {
    return null;
  }

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-primary text-primary-foreground'>
      <div className='container px-4 sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{CONTACT_CTA.TITLE}</h2>
          <p className='mt-3 sm:mt-4 text-base sm:text-lg opacity-90'>{CONTACT_CTA.SUBTITLE}</p>

          {/* Contact Info Grid */}
          <div className='mt-8 sm:mt-10 grid gap-6 sm:gap-4 md:gap-6 sm:grid-cols-3'>
            <div className='flex flex-col items-center gap-2 sm:gap-3'>
              <Phone className='h-5 w-5 sm:h-6 sm:w-6' />
              <div className='text-center'>
                <div className='text-xs sm:text-sm opacity-75 mb-1'>{COMPANY_INFO.PHONE}</div>
                <a
                  href={`tel:${companyInfo.fields.phone}`}
                  className='text-sm sm:text-base font-medium hover:underline'
                >
                  {companyInfo.fields.phone}
                </a>
              </div>
            </div>

            <div className='flex flex-col items-center gap-2 sm:gap-3'>
              <Mail className='h-5 w-5 sm:h-6 sm:w-6' />
              <div className='text-center'>
                <div className='text-xs sm:text-sm opacity-75 mb-1'>{COMPANY_INFO.EMAIL}</div>
                <a
                  href={`mailto:${companyInfo.fields.email}`}
                  className='text-sm sm:text-base font-medium hover:underline break-all'
                >
                  {companyInfo.fields.email}
                </a>
              </div>
            </div>

            <div className='flex flex-col items-center gap-2 sm:gap-3'>
              <MapPin className='h-5 w-5 sm:h-6 sm:w-6' />
              <div className='text-center'>
                <div className='text-xs sm:text-sm opacity-75 mb-1'>{COMPANY_INFO.ADDRESS}</div>
                <div className='text-sm sm:text-base font-medium'>{companyInfo.fields.address}</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className='mt-8 sm:mt-10'>
            <Button size='lg' variant='secondary' asChild className='w-full sm:w-auto'>
              <Link href='/contacts'>{CTA.CONTACT_US}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
