import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { getCompanyInfo } from '@/lib/contentful/api';
import { NAV, FOOTER, COMPANY_INFO } from '@/lib/constants/text';

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const companyInfo = await getCompanyInfo();

  if (!companyInfo) {
    return null;
  }

  return (
    <footer className='border-t bg-muted/30'>
      <div className='container py-8 md:py-12'>
        <div className='flex flex-col md:flex-row gap-8 md:justify-between'>
          <div className='space-y-3'>
            <Link href='/' className='flex items-center gap-2 mb-2 w-fit'>
              <Logo showText={false} className='opacity-80' />
              <h3 className='text-lg font-semibold'>{companyInfo.fields.name}</h3>
            </Link>
            <p className='text-sm text-muted-foreground max-w-xs'>{companyInfo.fields.description}</p>
          </div>

          <div className='space-y-3'>
            <h4 className='text-sm font-semibold tracking-wide'>{FOOTER.NAVIGATION}</h4>
            <ul className='flex flex-wrap gap-x-4 gap-y-2 text-sm'>
              <li>
                <Link href='/' className='text-muted-foreground hover:text-primary transition-colors inline-block'>
                  {NAV.HOME}
                </Link>
              </li>
              <li>
                <Link
                  href='/services'
                  className='text-muted-foreground hover:text-primary transition-colors inline-block'
                >
                  {NAV.SERVICES}
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-muted-foreground hover:text-primary transition-colors inline-block'>
                  {NAV.ABOUT}
                </Link>
              </li>
              <li>
                <Link
                  href='/contacts'
                  className='text-muted-foreground hover:text-primary transition-colors inline-block'
                >
                  {NAV.CONTACTS}
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-3'>
            <h4 className='text-sm font-semibold tracking-wide'>{FOOTER.CONTACTS}</h4>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <a
                  href={`tel:${companyInfo.fields.phone}`}
                  className='hover:text-primary transition-colors inline-block'
                >
                  {companyInfo.fields.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.fields.email}`}
                  className='hover:text-primary transition-colors inline-block break-all'
                >
                  {companyInfo.fields.email}
                </a>
              </li>
              <li className='text-sm leading-relaxed'>{companyInfo.fields.address}</li>
            </ul>
          </div>
        </div>

        <div className='mt-8 border-t pt-6 md:pt-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-muted-foreground mb-4'>
            <p className='text-center sm:text-left'>{FOOTER.COPYRIGHT(currentYear, companyInfo.fields.name)}</p>
            <div className='flex gap-4'>
              <Link href='/privacy' className='hover:text-primary transition-colors'>
                {FOOTER.PRIVACY_POLICY}
              </Link>
            </div>
          </div>

          {(companyInfo.fields.unp || companyInfo.fields.legalName) && (
            <div className='pt-4 border-t text-xs text-muted-foreground space-y-1'>
              {companyInfo.fields.legalName && <p>{companyInfo.fields.legalName}</p>}
              {companyInfo.fields.unp && (
                <p>
                  {COMPANY_INFO.UNP}: <span className='font-mono'>{companyInfo.fields.unp}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
