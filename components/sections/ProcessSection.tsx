import { Phone, MapPin, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PAGES } from '@/lib/constants/text';

const STEP_ICONS = [Phone, MapPin, FileCheck];

interface ProcessSectionProps {
  className?: string;
}

export function ProcessSection({ className }: ProcessSectionProps) {
  const { PROCESS } = PAGES.SERVICES;

  return (
    <section className={cn('flex flex-col gap-8 rounded-xl bg-muted/50', className)}>
      <h2 className='text-2xl font-bold tracking-tight text-center sm:text-3xl md:text-4xl'>{PROCESS.TITLE}</h2>

      <div className='grid gap-6 sm:gap-8 md:grid-cols-3'>
        {PROCESS.STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index];
          return (
            <div key={index} className='flex flex-col items-center text-center gap-4'>
              <div className='relative'>
                <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
                  <Icon className='w-7 h-7 text-primary' />
                </div>
                <div className='absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>
                  {index + 1}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-semibold'>{step.title}</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
