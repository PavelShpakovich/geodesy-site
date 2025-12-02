import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { LucideIcon } from 'lucide-react';

export interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
  preserveWhitespace?: boolean;
}

export function ContactInfoCard({ icon: Icon, title, value, href, preserveWhitespace }: ContactInfoCardProps) {
  const valueElement = href ? (
    <a
      href={href}
      className='text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all font-medium'
    >
      {value}
    </a>
  ) : (
    <p className={`text-sm sm:text-base text-muted-foreground ${preserveWhitespace ? 'whitespace-pre-line' : ''}`}>
      {value}
    </p>
  );

  return (
    <Card className='hover:shadow-lg transition-shadow'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <Icon className='h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0' />
          <CardTitle className='text-base sm:text-lg'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>{valueElement}</CardContent>
    </Card>
  );
}
