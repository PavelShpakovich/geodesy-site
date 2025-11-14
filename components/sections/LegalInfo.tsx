import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO } from '@/lib/constants/text';
import type { CompanyInfo } from '@/lib/contentful/api';
import { cn } from '@/lib/utils';

interface LegalInfoProps {
  companyInfo: CompanyInfo;
  className?: string;
}

export function LegalInfo({ companyInfo, className }: LegalInfoProps) {
  const { unp, legalName, bankName, bankAccount, bic } = companyInfo.fields;

  if (!unp && !legalName && !bankName && !bankAccount && !bic) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h3 className='text-lg sm:text-xl font-bold'>{COMPANY_INFO.LEGAL_INFO}</h3>
      <Card className='hover:shadow-lg transition-shadow'>
        <CardContent>
          <dl className='flex flex-col gap-3 text-sm sm:text-base'>
            {legalName && (
              <div>
                <dt className='font-semibold text-muted-foreground'>{COMPANY_INFO.LEGAL_NAME}:</dt>
                <dd className='mt-1'>{legalName}</dd>
              </div>
            )}
            {unp && (
              <div>
                <dt className='font-semibold text-muted-foreground'>{COMPANY_INFO.UNP}:</dt>
                <dd className='mt-1 font-mono'>{unp}</dd>
              </div>
            )}
            {bankName && (
              <div>
                <dt className='font-semibold text-muted-foreground'>{COMPANY_INFO.BANK_NAME}:</dt>
                <dd className='mt-1'>{bankName}</dd>
              </div>
            )}
            {bankAccount && (
              <div>
                <dt className='font-semibold text-muted-foreground'>{COMPANY_INFO.BANK_ACCOUNT}:</dt>
                <dd className='mt-1 font-mono'>{bankAccount}</dd>
              </div>
            )}
            {bic && (
              <div>
                <dt className='font-semibold text-muted-foreground'>{COMPANY_INFO.BIC}:</dt>
                <dd className='mt-1 font-mono'>{bic}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
