'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, FolderCheck, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PAGES } from '@/lib/constants/text';

interface StatsData {
  yearsInBusiness: number;
  projectsCompleted: number;
  clientsServed: number;
  regionsServed: string;
}

interface StatsSectionProps {
  stats: StatsData;
  className?: string;
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsSection({ stats, className }: StatsSectionProps) {
  const { STATS } = PAGES.ABOUT;

  const statItems = [
    {
      icon: Calendar,
      value: stats.yearsInBusiness,
      suffix: '+',
      label: STATS.YEARS,
    },
    {
      icon: FolderCheck,
      value: stats.projectsCompleted,
      suffix: '+',
      label: STATS.PROJECTS,
    },
    {
      icon: Users,
      value: stats.clientsServed,
      suffix: '+',
      label: STATS.CLIENTS,
    },
  ];

  return (
    <section className={cn('py-12 sm:py-16', className)}>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
        {statItems.map((stat, index) => (
          <div key={index} className='text-center flex flex-col items-center gap-2 sm:gap-3'>
            <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center'>
              <stat.icon className='w-6 h-6 sm:w-7 sm:h-7 text-primary' />
            </div>
            <div className='text-3xl sm:text-4xl md:text-5xl font-bold text-primary'>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>
            <div className='text-sm sm:text-base text-muted-foreground'>{stat.label}</div>
          </div>
        ))}
        <div className='text-center flex flex-col items-center gap-2 sm:gap-3'>
          <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center'>
            <MapPin className='w-6 h-6 sm:w-7 sm:h-7 text-primary' />
          </div>
          <div className='text-lg sm:text-xl md:text-2xl font-bold text-primary'>{stats.regionsServed}</div>
          <div className='text-sm sm:text-base text-muted-foreground'>{STATS.REGION}</div>
        </div>
      </div>
    </section>
  );
}
