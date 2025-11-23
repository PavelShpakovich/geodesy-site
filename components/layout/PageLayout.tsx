import { cn } from '@/lib/utils';
import { PAGE_CONFIG } from '@/lib/constants/config';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * Reusable page layout wrapper with consistent spacing and container
 * Reduces code duplication across pages
 */
export function PageLayout({ children, className, containerClassName }: PageLayoutProps) {
  return (
    <div className={cn(PAGE_CONFIG.CONTAINER_CLASSES, containerClassName)}>
      <div className={cn(PAGE_CONFIG.CONTENT_GAP_CLASSES, className)}>{children}</div>
    </div>
  );
}
