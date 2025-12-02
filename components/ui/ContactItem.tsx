import type { LucideIcon } from 'lucide-react';

export interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export function ContactItem({ icon: Icon, label, value, href }: ContactItemProps) {
  const valueElement = href ? (
    <a href={href} className='text-sm sm:text-base font-medium hover:underline break-all'>
      {value}
    </a>
  ) : (
    <div className='text-sm sm:text-base font-medium'>{value}</div>
  );

  return (
    <div className='flex flex-col items-center gap-2 sm:gap-3'>
      <Icon className='h-5 w-5 sm:h-6 sm:w-6' />
      <div className='text-center flex flex-col gap-1'>
        <div className='text-xs sm:text-sm opacity-75'>{label}</div>
        {valueElement}
      </div>
    </div>
  );
}
