import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SECTIONS } from '@/lib/constants/text';
import type { Advantage } from '@/lib/contentful/api';

interface AdvantagesSectionProps {
  advantages: Advantage[];
}

export function AdvantagesSection({ advantages }: AdvantagesSectionProps) {
  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24'>
      <div className='container px-4 sm:px-6 flex flex-col gap-10 sm:gap-12 lg:gap-16'>
        <div className='mx-auto max-w-2xl text-center flex flex-col gap-3 sm:gap-4'>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{SECTIONS.ADVANTAGES.TITLE}</h2>
          <p className='text-base sm:text-lg text-muted-foreground'>{SECTIONS.ADVANTAGES.SUBTITLE}</p>
        </div>

        <div className='grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {advantages.map((advantage) => (
            <Card key={advantage.sys.id} className='hover:shadow-lg transition-all hover:scale-[1.02] duration-300'>
              <CardHeader>
                <CardTitle className='text-lg sm:text-xl'>{advantage.fields.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                  {advantage.fields.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
