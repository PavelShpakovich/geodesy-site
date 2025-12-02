import { Card, CardContent } from '@/components/ui/Card';
import { COMPANY_INFO } from '@/lib/constants/text';
import type { CompanyInfo } from '@/lib/contentful/api';
import { cn } from '@/lib/utils';

interface LegalInfoProps {
  companyInfo: CompanyInfo;
  className?: string;
}

interface LegalInfoItem {
  label: string;
  value?: string;
  mono?: boolean;
}

export function LegalInfo({ companyInfo, className }: LegalInfoProps) {
  const { unp, legalName, bankName, bankAccount, bic } = companyInfo.fields;

  const items: LegalInfoItem[] = [
    { label: COMPANY_INFO.LEGAL_NAME, value: legalName },
    { label: COMPANY_INFO.UNP, value: unp, mono: true },
    { label: COMPANY_INFO.BANK_NAME, value: bankName },
    { label: COMPANY_INFO.BANK_ACCOUNT, value: bankAccount, mono: true },
    { label: COMPANY_INFO.BIC, value: bic, mono: true },
  ].filter((item) => item.value);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h3 className='text-lg sm:text-xl font-bold'>{COMPANY_INFO.LEGAL_INFO}</h3>
      <Card className='hover:shadow-lg transition-shadow'>
        <CardContent>
          <dl className='flex flex-col gap-3 text-sm sm:text-base'>
            {items.map((item) => (
              <div key={item.label}>
                <dt className='font-semibold text-muted-foreground'>{item.label}:</dt>
                <dd className={`mt-1 ${item.mono ? 'font-mono' : ''}`}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
