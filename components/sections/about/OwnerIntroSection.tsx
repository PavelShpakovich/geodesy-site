import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ALT_TEXTS } from '@/lib/constants/text';

interface OwnerData {
  name: string;
  title: string;
  photo?: string;
  story: string;
}

interface OwnerIntroSectionProps {
  owner: OwnerData;
  showPhoto?: boolean;
  className?: string;
}

export function OwnerIntroSection({ owner, showPhoto = false, className }: OwnerIntroSectionProps) {
  return (
    <section className={cn('flex flex-col gap-8', className)}>
      <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
        {showPhoto && owner.photo && (
          <div className='shrink-0'>
            <div className='relative w-48 h-56 sm:w-56 sm:h-64 lg:w-64 lg:h-72 rounded-2xl overflow-hidden shadow-xl'>
              <Image
                src={owner.photo}
                alt={ALT_TEXTS.OWNER_PHOTO(owner.name)}
                fill
                className='object-cover'
                sizes='(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px'
              />
            </div>
          </div>
        )}

        <div className='flex flex-col gap-4 text-center lg:text-left'>
          <div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight'>{owner.name}</h1>
            <p className='text-lg sm:text-xl text-primary font-medium mt-2'>{owner.title}</p>
          </div>
          <p className='text-base sm:text-lg text-muted-foreground whitespace-pre-line leading-relaxed max-w-3xl'>
            {owner.story}
          </p>
        </div>
      </div>
    </section>
  );
}
