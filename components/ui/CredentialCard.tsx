import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface CredentialItem {
  primary: string;
  secondary: string;
  tertiary: string;
}

interface CredentialCardProps {
  title: string;
  icon: LucideIcon;
  items: CredentialItem[];
}

export function CredentialCard({ title, icon: Icon, items }: CredentialCardProps) {
  if (items.length === 0) return null;

  return (
    <Card className='hover:shadow-lg transition-shadow flex-1'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
            <Icon className='w-5 h-5 text-primary' />
          </div>
          <CardTitle className='text-lg'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {items.map((item, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <p className='font-medium text-sm sm:text-base'>{item.primary}</p>
            <p className='text-sm text-muted-foreground'>{item.secondary}</p>
            <p className='text-xs text-muted-foreground'>{item.tertiary}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
