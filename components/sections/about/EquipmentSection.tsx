import { Card, CardContent } from '@/components/ui/Card';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { cn } from '@/lib/utils';
import { PAGES } from '@/lib/constants/text';

interface EquipmentItem {
  name: string;
  model: string;
  description: string;
  icon?: string;
}

interface EquipmentData {
  description: string;
  items: EquipmentItem[];
}

interface EquipmentSectionProps {
  equipment: EquipmentData;
  className?: string;
}

export function EquipmentSection({ equipment, className }: EquipmentSectionProps) {
  return (
    <section className={cn('flex flex-col gap-8', className)}>
      <div className='text-center flex flex-col gap-3'>
        <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{PAGES.ABOUT.EQUIPMENT.TITLE}</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>{equipment.description}</p>
      </div>

      <div className='grid gap-4 md:gap-6 md:grid-cols-2'>
        {equipment.items.map((item, index) => (
          <Card key={index} className='hover:shadow-lg transition-shadow duration-300'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex gap-3 sm:gap-4'>
                <div className='shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
                  <DynamicIcon name={item.icon} fallback='Satellite' className='w-5 h-5 sm:w-6 sm:h-6' />
                </div>
                <div className='flex flex-col gap-1 min-w-0'>
                  <h3 className='font-semibold text-sm sm:text-base md:text-lg'>{item.name}</h3>
                  <p className='text-xs sm:text-sm text-primary font-medium'>{item.model}</p>
                  <p className='text-xs sm:text-sm text-muted-foreground mt-1'>{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
