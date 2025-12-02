import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ContactItem, type ContactItemProps } from '@/components/ui/ContactItem';
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

  const { phone, email, address } = companyInfo.fields;

  const contactItems: ContactItemProps[] = [
    { icon: Phone, label: COMPANY_INFO.PHONE, value: phone, href: `tel:${phone}` },
    { icon: Mail, label: COMPANY_INFO.EMAIL, value: email, href: `mailto:${email}` },
    { icon: MapPin, label: COMPANY_INFO.ADDRESS, value: address },
  ];

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-primary text-primary-foreground'>
      <div className='container px-4 sm:px-6'>
        <div className='mx-auto max-w-3xl text-center flex flex-col gap-8 sm:gap-10'>
          <div className='flex flex-col gap-3 sm:gap-4'>
            <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{CONTACT_CTA.TITLE}</h2>
            <p className='text-base sm:text-lg opacity-90'>{CONTACT_CTA.SUBTITLE}</p>
          </div>

          <div className='grid gap-6 sm:gap-4 md:gap-6 sm:grid-cols-3'>
            {contactItems.map((item) => (
              <ContactItem key={item.label} {...item} />
            ))}
          </div>

          <div>
            <Button size='lg' variant='secondary' asChild className='w-full sm:w-auto'>
              <Link href='/contacts'>{CTA.CONTACT_US}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
