import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SECTIONS } from '@/lib/constants/text';
import type { Advantage } from '@/lib/contentful/api';
import {
  Satellite,
  UserCheck,
  Clock,
  ShieldCheck,
  BadgePercent,
  FileText,
  Award,
  CheckCircle,
  Star,
  Zap,
  Target,
  ThumbsUp,
  Heart,
  Shield,
  Lock,
  Briefcase,
  Calculator,
  Map,
  MapPin,
  Compass,
  Ruler,
  PenTool,
  Settings,
  Wrench,
  Phone,
  Mail,
  MessageSquare,
  Users,
  Building,
  Home,
  Landmark,
  TreePine,
  Mountain,
  type LucideIcon,
} from 'lucide-react';

// Map icon names from Contentful to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  Satellite,
  UserCheck,
  Clock,
  ShieldCheck,
  BadgePercent,
  FileText,
  Award,
  CheckCircle,
  Star,
  Zap,
  Target,
  ThumbsUp,
  Heart,
  Shield,
  Lock,
  Briefcase,
  Calculator,
  Map,
  MapPin,
  Compass,
  Ruler,
  PenTool,
  Settings,
  Wrench,
  Phone,
  Mail,
  MessageSquare,
  Users,
  Building,
  Home,
  Landmark,
  TreePine,
  Mountain,
};

interface AdvantagesSectionProps {
  advantages: Advantage[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export function AdvantagesSection({ advantages, title, subtitle, showHeader = true }: AdvantagesSectionProps) {
  const sectionTitle = title ?? SECTIONS.ADVANTAGES.TITLE;
  const sectionSubtitle = subtitle ?? SECTIONS.ADVANTAGES.SUBTITLE;

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24'>
      <div className='container px-4 sm:px-6 flex flex-col gap-10 sm:gap-12 lg:gap-16'>
        {showHeader && (
          <div className='mx-auto max-w-2xl text-center flex flex-col gap-3 sm:gap-4'>
            <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>{sectionTitle}</h2>
            {sectionSubtitle && <p className='text-base sm:text-lg text-muted-foreground'>{sectionSubtitle}</p>}
          </div>
        )}

        <div className='grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {advantages.map((advantage) => {
            const iconName = advantage.fields.icon;
            const Icon = iconName ? iconMap[iconName] : undefined;
            return (
              <Card key={advantage.sys.id} className='hover:shadow-lg transition-all hover:scale-[1.02] duration-300'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    {Icon && (
                      <div className='shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary'>
                        <Icon className='w-5 h-5' />
                      </div>
                    )}
                    <CardTitle className='text-lg sm:text-xl'>{advantage.fields.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                    {advantage.fields.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
