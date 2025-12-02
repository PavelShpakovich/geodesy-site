import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { GraduationCap, Award, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
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

  return (
    <section className={cn('flex flex-col gap-8', className)}>
      <h2 className='text-2xl sm:text-3xl font-bold text-center'>{CREDENTIALS.TITLE}</h2>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Education */}
        {credentials.education.length > 0 && (
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <GraduationCap className='w-5 h-5 text-primary' />
                </div>
                <CardTitle className='text-lg'>{CREDENTIALS.EDUCATION}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              {credentials.education.map((edu, index) => (
                <div key={index} className='flex flex-col gap-1'>
                  <p className='font-medium text-sm sm:text-base'>{edu.degree}</p>
                  <p className='text-sm text-muted-foreground'>{edu.institution}</p>
                  <p className='text-xs text-muted-foreground'>{edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Certifications */}
        {credentials.certifications.length > 0 && (
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <Award className='w-5 h-5 text-primary' />
                </div>
                <CardTitle className='text-lg'>{CREDENTIALS.CERTIFICATIONS}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              {credentials.certifications.map((cert, index) => (
                <div key={index} className='flex flex-col gap-1'>
                  <p className='font-medium text-sm sm:text-base'>{cert.title}</p>
                  <p className='text-sm text-muted-foreground'>{cert.issuer}</p>
                  <p className='text-xs text-muted-foreground'>{cert.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Licenses */}
        {credentials.licenses.length > 0 && (
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <FileCheck className='w-5 h-5 text-primary' />
                </div>
                <CardTitle className='text-lg'>{CREDENTIALS.LICENSES}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              {credentials.licenses.map((license, index) => (
                <div key={index} className='flex flex-col gap-1'>
                  <p className='font-medium text-sm sm:text-base'>{license.title}</p>
                  <p className='text-sm text-muted-foreground'>
                    {CREDENTIALS.LICENSE_NUMBER} {license.number}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {CREDENTIALS.VALID_UNTIL} {license.validUntil}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
