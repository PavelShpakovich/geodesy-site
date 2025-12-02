import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

interface DynamicIconProps {
  name?: string;
  fallback?: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, fallback, className, size = 20 }: DynamicIconProps) {
  const Icon = getIcon(name, fallback);

  if (!Icon) {
    return null;
  }

  return <Icon className={cn(className)} style={{ width: size, height: size }} />;
}
