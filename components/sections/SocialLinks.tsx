import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Send, Phone, MessageCircle, Instagram } from 'lucide-react';
import { MESSENGERS, COMPANY_INFO } from '@/lib/constants/text';
import type { CompanyInfo } from '@/lib/contentful/api';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  companyInfo: CompanyInfo;
  variant?: 'buttons' | 'card';
  className?: string;
}

export function SocialLinks({ companyInfo, variant = 'buttons', className }: SocialLinksProps) {
  const { telegram, viber, whatsapp, instagram } = companyInfo.fields;

  if (!telegram && !viber && !whatsapp && !instagram) {
    return null;
  }

  const links = (
    <div className='flex flex-wrap gap-3'>
      {telegram && (
        <Button variant='outline' size='sm' asChild className='flex-1 sm:flex-initial'>
          <a href={`https://t.me/${telegram}`} target='_blank' rel='noopener noreferrer'>
            <Send className='mr-2 h-4 w-4' />
            {MESSENGERS.TELEGRAM}
          </a>
        </Button>
      )}
      {viber && (
        <Button variant='outline' size='sm' asChild className='flex-1 sm:flex-initial'>
          <a href={`viber://chat?number=${viber}`}>
            <Phone className='mr-2 h-4 w-4' />
            {MESSENGERS.VIBER}
          </a>
        </Button>
      )}
      {whatsapp && (
        <Button variant='outline' size='sm' asChild className='flex-1 sm:flex-initial'>
          <a href={`https://wa.me/${whatsapp}`} target='_blank' rel='noopener noreferrer'>
            <MessageCircle className='mr-2 h-4 w-4' />
            {MESSENGERS.WHATSAPP}
          </a>
        </Button>
      )}
      {instagram && (
        <Button variant='outline' size='sm' asChild className='flex-1 sm:flex-initial'>
          <a
            href={instagram.startsWith('http') ? instagram : `https://instagram.com/${instagram}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Instagram className='mr-2 h-4 w-4' />
            {MESSENGERS.INSTAGRAM}
          </a>
        </Button>
      )}
    </div>
  );

  if (variant === 'card') {
    return (
      <Card className={cn('hover:shadow-lg transition-shadow', className)}>
        <CardHeader>
          <CardTitle className='text-base sm:text-lg'>{COMPANY_INFO.MESSENGERS}</CardTitle>
        </CardHeader>
        <CardContent>{links}</CardContent>
      </Card>
    );
  }

  return <div className={className}>{links}</div>;
}
