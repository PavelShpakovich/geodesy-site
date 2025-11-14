import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const gridClass =
    layout === 'grid' ? 'grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4' : 'flex flex-col gap-4 sm:gap-6';

  return (
    <div className={cn(gridClass, className)}>
      <Card className='hover:shadow-lg transition-shadow'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <Phone className='h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0' />
            <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.PHONE}</CardTitle>
          </div>
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
        <CardHeader>
          <div className='flex items-center gap-3'>
            <Mail className='h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0' />
            <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.EMAIL}</CardTitle>
          </div>
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
        <CardHeader>
          <div className='flex items-center gap-3'>
            <MapPin className='h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0' />
            <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.ADDRESS}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-sm sm:text-base text-muted-foreground'>{companyInfo.fields.address}</p>
        </CardContent>
      </Card>

      <Card className='hover:shadow-lg transition-shadow'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <Clock className='h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0' />
            <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.WORK_HOURS}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-sm sm:text-base text-muted-foreground whitespace-pre-line'>
            {companyInfo.fields.workHours}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
