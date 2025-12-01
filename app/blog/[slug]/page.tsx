import { getBlogPostBySlug, getAllBlogSlugs, getCompanyInfo, getSeoData } from '@/lib/contentful/api';
import { getAssetUrl } from '@/lib/contentful/client';
import { renderRichText } from '@/lib/contentful/rich-text';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Phone } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CTA, PAGES } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateBlogPostMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Revalidate every 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: PAGES.BLOG.NOT_FOUND,
    };
  }

  const seoData = await getSeoData(slug);

  return generateBlogPostMetadata(
    {
      title: post.fields.title,
      excerpt: post.fields.excerpt,
      metaDescription: post.fields.metaDescription,
      coverImage: post.fields.coverImage,
      slug: post.fields.slug,
      publishedAt: post.fields.publishedAt,
      author: post.fields.author,
    },
    seoData
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, companyInfo] = await Promise.all([getBlogPostBySlug(slug), getCompanyInfo()]);

  if (!post) {
    notFound();
  }

  const structuredData = structuredDataHelpers.forBlogPost(post, companyInfo);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout className='gap-8 sm:gap-12'>
        <div>
          <Button variant='ghost' size='sm' asChild className='gap-2'>
            <Link href='/blog'>
              <ArrowLeft className='h-4 w-4' />
              {CTA.BACK_TO_BLOG}
            </Link>
          </Button>
        </div>

        <article className='max-w-3xl mx-auto w-full'>
          <header className='mb-8'>
            <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4'>
              <span className='flex items-center gap-1.5'>
                <Calendar className='h-4 w-4' />
                {formatDate(post.fields.publishedAt)}
              </span>
              {post.fields.readingTime && (
                <span className='flex items-center gap-1.5'>
                  <Clock className='h-4 w-4' />
                  {PAGES.BLOG.READING_TIME(post.fields.readingTime)}
                </span>
              )}
              {post.fields.author && (
                <span className='flex items-center gap-1.5'>
                  <User className='h-4 w-4' />
                  {post.fields.author}
                </span>
              )}
            </div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6'>{post.fields.title}</h1>

            <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed'>{post.fields.excerpt}</p>
          </header>

          {getAssetUrl(post.fields.coverImage) && (
            <div className='relative w-full aspect-video rounded-lg overflow-hidden mb-8'>
              <Image
                src={getAssetUrl(post.fields.coverImage)}
                alt={post.fields.coverImage?.fields?.title || post.fields.title}
                fill
                priority
                className='object-contain'
                sizes='(max-width: 768px) 100vw, 800px'
              />
            </div>
          )}

          <div className='prose prose-lg dark:prose-invert max-w-none'>{renderRichText(post.fields.content)}</div>
        </article>

        <div className='bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 text-center flex flex-col gap-5 sm:gap-6 max-w-3xl mx-auto w-full'>
          <h2 className='text-xl sm:text-2xl font-bold'>{PAGES.BLOG.CTA_TITLE}</h2>
          <p className='text-sm sm:text-base opacity-90'>{PAGES.BLOG.CTA_SUBTITLE}</p>
          <div>
            <Button size='lg' variant='secondary' asChild className='w-full sm:w-auto'>
              <Link href='/contacts'>
                <Phone className='mr-2 h-4 w-4' />
                {CTA.CONTACT_US}
              </Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
