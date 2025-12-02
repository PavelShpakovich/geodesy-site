import { ContactInfoCard, type ContactInfoCardProps } from '@/components/ui/ContactInfoCard';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants/text';
import type { CompanyInfo } from '@/lib/contentful/api';
import { cn } from '@/lib/utils';

interface ContactInfoProps {
  companyInfo: CompanyInfo;
  layout?: 'grid' | 'stacked';
  className?: string;
}

export function ContactInfo({ companyInfo, layout = 'grid', className }: ContactInfoProps) {
  const { phone, email, address, workHours } = companyInfo.fields;

  const contactItems: ContactInfoCardProps[] = [
    { icon: Phone, title: COMPANY_INFO.PHONE, value: phone, href: `tel:${phone}` },
    { icon: Mail, title: COMPANY_INFO.EMAIL, value: email, href: `mailto:${email}` },
    { icon: MapPin, title: COMPANY_INFO.ADDRESS, value: address },
    { icon: Clock, title: COMPANY_INFO.WORK_HOURS, value: workHours, preserveWhitespace: true },
  ];

  const gridClass =
    layout === 'grid' ? 'grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4' : 'flex flex-col gap-4 sm:gap-6';

  return (
    <div className={cn(gridClass, className)}>
      {contactItems.map((item) => (
        <ContactInfoCard key={item.title} {...item} />
      ))}
    </div>
  );
}
