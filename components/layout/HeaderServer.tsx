import { getCompanyInfo } from '@/lib/contentful/api';
import { HeaderClient } from './Header';

/**
 * Server Component wrapper for Header
 * Fetches company info from Contentful and passes to client component
 */
export async function Header() {
  const companyInfo = await getCompanyInfo();

  if (!companyInfo) {
    return null;
  }

  return <HeaderClient companyName={companyInfo.fields.name} companyPhone={companyInfo.fields.phone} />;
}
