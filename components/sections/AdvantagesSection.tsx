import { AdvantageCard } from '@/components/ui/AdvantageCard';
import { SECTIONS } from '@/lib/constants/text';
import type { Advantage } from '@/lib/contentful/api';

interface AdvantagesSectionProps {
  advantages: Advantage[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export function AdvantagesSection({ advantages, title, subtitle, showHeader = true }: AdvantagesSectionProps) {
  const sectionTitle = title ?? SECTIONS.ADVANTAGES.TITLE;
  const sectionSubtitle = subtitle ?? SECTIONS.ADVANTAGES.SUBTITLE;

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24'>
      <div className='container px-4 sm:px-6 flex flex-col gap-10 sm:gap-12 lg:gap-16'>
        {showHeader && (
          <div className='mx-auto max-w-2xl text-center flex flex-col gap-3 sm:gap-4'>
            <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{sectionTitle}</h2>
            {sectionSubtitle && <p className='text-base sm:text-lg text-muted-foreground'>{sectionSubtitle}</p>}
          </div>
        )}

        <div className='grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {advantages.map((advantage) => (
            <AdvantageCard
              key={advantage.sys.id}
              title={advantage.fields.title}
              description={advantage.fields.description}
              icon={advantage.fields.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
