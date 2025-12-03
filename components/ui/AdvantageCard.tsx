import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface AdvantageCardProps {
  title: string;
  description: string;
  icon?: string;
}

export function AdvantageCard({ title, description, icon }: AdvantageCardProps) {
  return (
    <Card className='hover:shadow-lg transition-shadow duration-300'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          {icon && (
            <div className='shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary'>
              <DynamicIcon name={icon} />
            </div>
          )}
          <CardTitle className='text-lg sm:text-xl'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>{description}</p>
      </CardContent>
    </Card>
  );
}
