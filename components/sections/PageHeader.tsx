import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center flex flex-col gap-4', className)}>
      <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>{title}</h1>
      {subtitle && <p className='text-base sm:text-lg md:text-xl text-muted-foreground'>{subtitle}</p>}
    </div>
  );
}
