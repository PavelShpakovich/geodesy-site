'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { cn } from '@/lib/utils';
import { SECTIONS } from '@/lib/constants/text';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  className?: string;
}

export function FAQSection({ faqs, className }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className={cn('flex flex-col gap-8', className)}>
      <div className='text-center flex flex-col gap-3'>
        <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{SECTIONS.FAQ.TITLE}</h2>
        <p className='text-muted-foreground'>{SECTIONS.FAQ.SUBTITLE}</p>
      </div>

      <div className='max-w-3xl mx-auto w-full bg-card rounded-xl border shadow-sm'>
        <Accordion type='single' collapsible>
          {faqs.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className='border-b last:border-b-0 px-6'>
              <AccordionTrigger className='text-sm sm:text-base text-left'>{item.question}</AccordionTrigger>
              <AccordionContent className='text-muted-foreground leading-relaxed'>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
