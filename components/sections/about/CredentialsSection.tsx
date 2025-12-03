import { GraduationCap, Award, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CredentialCard } from '@/components/ui/CredentialCard';
import { PAGES } from '@/lib/constants/text';

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

interface License {
  title: string;
  number: string;
  validUntil: string;
}

interface CredentialsData {
  education: Education[];
  certifications: Certification[];
  licenses: License[];
}

interface CredentialsSectionProps {
  credentials: CredentialsData;
  className?: string;
}

export function CredentialsSection({ credentials, className }: CredentialsSectionProps) {
  const { CREDENTIALS } = PAGES.ABOUT;

  const educationItems = credentials.education.map((edu) => ({
    primary: edu.degree,
    secondary: edu.institution,
    tertiary: edu.year,
  }));

  const certificationItems = credentials.certifications.map((cert) => ({
    primary: cert.title,
    secondary: cert.issuer,
    tertiary: cert.year,
  }));

  const licenseItems = credentials.licenses.map((license) => ({
    primary: license.title,
    secondary: `${CREDENTIALS.LICENSE_NUMBER} ${license.number}`,
    tertiary: `${CREDENTIALS.VALID_UNTIL} ${license.validUntil}`,
  }));

  return (
    <section className={cn('flex flex-col gap-8', className)}>
      <h2 className='text-2xl sm:text-3xl font-bold text-center'>{CREDENTIALS.TITLE}</h2>

      <div className='flex flex-col md:flex-row gap-6'>
        <CredentialCard title={CREDENTIALS.EDUCATION} icon={GraduationCap} items={educationItems} />
        <CredentialCard title={CREDENTIALS.CERTIFICATIONS} icon={Award} items={certificationItems} />
        <CredentialCard title={CREDENTIALS.LICENSES} icon={FileCheck} items={licenseItems} />
      </div>
    </section>
  );
}
