import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { getCompanyInfo, getServices } from '@/lib/contentful/api';
import { NAV, FOOTER } from '@/lib/constants/text';

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const companyInfo = await getCompanyInfo();
  const services = await getServices();

  if (!companyInfo) {
    return null;
  }

  return (
    <footer className='border-t bg-muted/30'>
      <div className='container py-8 md:py-12'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Company Info */}
          <div className='space-y-3 sm:col-span-2 lg:col-span-1'>
            <Link href='/' className='flex items-center gap-2 mb-2 w-fit'>
              <Logo showText={false} className='opacity-80' />
              <h3 className='text-lg font-semibold'>{companyInfo.fields.name}</h3>
            </Link>
            <p className='text-sm text-muted-foreground max-w-xs'>{companyInfo.fields.description}</p>
          </div>

          {/* Navigation */}
          <div className='space-y-3'>
            <h4 className='text-sm font-semibold tracking-wide'>{FOOTER.NAVIGATION}</h4>
            <ul className='space-y-2 text-sm'>
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

          {/* Services */}
          <div className='space-y-3'>
            <h4 className='text-sm font-semibold tracking-wide'>{FOOTER.SERVICES}</h4>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              {services.slice(0, 4).map((service) => (
                <li key={service.fields.title} className='line-clamp-1'>
                  {service.fields.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
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

        <div className='mt-8 border-t pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground'>
          <p className='text-center sm:text-left'>{FOOTER.COPYRIGHT(currentYear, companyInfo.fields.name)}</p>
          <div className='flex gap-4'>
            <Link href='/privacy' className='hover:text-primary transition-colors'>
              {FOOTER.PRIVACY_POLICY}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
