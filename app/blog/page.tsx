import { getBlogPosts } from '@/lib/contentful/api';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { PageHeader } from '@/components/sections/PageHeader';
import { PageLayout } from '@/components/layout/PageLayout';
import { PAGES } from '@/lib/constants/text';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateBlogMetadata } from '@/lib/seo/metadata';
import { structuredDataHelpers } from '@/lib/seo/structured-data-helpers';
import type { Metadata } from 'next';

// Revalidate every 24 hours
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generateBlogMetadata();
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  const structuredData = structuredDataHelpers.forBlogPage(blogPosts);

  return (
    <>
      <StructuredData data={structuredData} />
      <PageLayout>
        <PageHeader title={PAGES.BLOG.TITLE} subtitle={PAGES.BLOG.SUBTITLE} />

        {blogPosts.length > 0 ? (
          <div className='grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {blogPosts.map((post) => (
              <BlogPostCard key={post.sys.id} post={post} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>{PAGES.BLOG.NO_POSTS}</p>
          </div>
        )}
      </PageLayout>
    </>
  );
}
