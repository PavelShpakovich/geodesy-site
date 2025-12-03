import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { CTA, PAGES } from '@/lib/constants/text';
import type { BlogPost } from '@/lib/contentful/api';
import { Button } from '@/components/ui/Button';
import { cn, formatDate } from '@/lib/utils';
import { getAssetUrl } from '@/lib/contentful/client';

export interface BlogPostCardProps {
  post: BlogPost;
  /**
   * full: With image, all details (for carousels/related sections)
   * compact: No image, minimal info (for listing pages)
   */
  variant?: 'full' | 'compact';
  className?: string;
}

export function BlogPostCard({ post, variant = 'full', className }: BlogPostCardProps) {
  const coverUrl = getAssetUrl(post.fields.coverImage);
  const href = `/blog/${post.fields.slug}`;

  const date = formatDate(post.fields.publishedAt);
  const reading = post.fields.readingTime ? PAGES.BLOG.READING_TIME(post.fields.readingTime) : null;

  if (variant === 'compact') {
    // Compact: no image, minimal info
    return (
      <Card
        className={cn('hover:shadow-lg transition-shadow duration-300 overflow-hidden p-0 flex flex-col', className)}
      >
        <div className='flex flex-1 flex-col p-6'>
          <CardHeader className='mb-3 p-0'>
            <div className='mb-2 flex items-center gap-4 text-xs text-muted-foreground sm:text-sm'>
              <span className='flex items-center gap-1'>
                <Calendar className='h-3.5 w-3.5' />
                {date}
              </span>
              {reading && (
                <span className='flex items-center gap-1'>
                  <Clock className='h-3.5 w-3.5' />
                  {reading}
                </span>
              )}
            </div>
            <Link href={href} className='rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
              <CardTitle className='line-clamp-2 text-lg sm:text-xl'>{post.fields.title}</CardTitle>
            </Link>
          </CardHeader>
          <CardContent className='flex flex-col p-0'>
            <CardDescription className='flex-1 text-sm leading-relaxed sm:text-base line-clamp-3'>
              {post.fields.excerpt}
            </CardDescription>
            <div className='mt-4 border-t pt-4'>
              <Button
                variant='ghost'
                size='sm'
                asChild
                className='h-auto rounded-sm p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-primary'
              >
                <Link
                  href={href}
                  className='flex items-center gap-1 text-primary hover:text-primary/80'
                  aria-label={`Читать далее: ${post.fields.title}`}
                >
                  {CTA.READ_MORE}
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Full variant: with image, all details
  return (
    <Card className={cn('overflow-hidden p-0 flex flex-col transition-shadow duration-300 hover:shadow-lg', className)}>
      {coverUrl && (
        <div className='relative block h-48 w-full overflow-hidden'>
          <Image
            src={coverUrl}
            alt={post.fields.coverImage?.fields?.title || post.fields.title}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />
        </div>
      )}
      <span className='sr-only'>{post.fields.title}</span>
      <div className='flex flex-1 flex-col justify-end-safe p-6'>
        <CardHeader className='mb-3 p-0'>
          <div className='mb-2 flex items-center gap-4 text-xs text-muted-foreground sm:text-sm'>
            <span className='flex items-center gap-1'>
              <Calendar className='h-3.5 w-3.5' />
              {date}
            </span>
            {reading && (
              <span className='flex items-center gap-1'>
                <Clock className='h-3.5 w-3.5' />
                {reading}
              </span>
            )}
          </div>
          <Link href={href} className='rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
            <CardTitle className='line-clamp-2 text-lg sm:text-xl'>{post.fields.title}</CardTitle>
          </Link>
        </CardHeader>
        <CardContent className='flex flex-col p-0'>
          <CardDescription className='flex-1 text-sm leading-relaxed sm:text-base max-h-[4.5em] overflow-hidden'>
            {post.fields.excerpt}
          </CardDescription>
          <div className='mt-4 border-t pt-4'>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='h-auto rounded-sm p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-primary'
            >
              <Link
                href={href}
                className='flex items-center gap-1 text-primary hover:text-primary/80'
                aria-label={`Читать далее: ${post.fields.title}`}
              >
                {CTA.READ_MORE}
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
