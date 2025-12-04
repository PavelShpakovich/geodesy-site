import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import { formatContentfulUrl } from './client';
import { ALT_TEXTS } from '@/lib/constants/text';
import type { Options } from '@contentful/rich-text-react-renderer';

export const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className='text-xl font-semibold mt-6 mb-3'>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4 className='text-lg font-semibold mt-4 mb-2'>{children}</h4>,
    [BLOCKS.PARAGRAPH]: (node, children) => <p className='mb-4 leading-relaxed'>{children}</p>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className='list-disc pl-6 mb-4 space-y-2'>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className='list-decimal pl-6 mb-4 space-y-2'>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className='border-l-4 border-primary pl-4 italic my-4 text-muted-foreground'>{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr className='my-8 border-border' />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title, description } = node.data.target.fields;
      const imageUrl = formatContentfulUrl(file?.url);
      if (!imageUrl) return null;

      return (
        <figure className='my-6'>
          <div className='relative w-full aspect-video rounded-lg overflow-hidden'>
            <Image
              src={imageUrl}
              alt={description || title || ALT_TEXTS.ARTICLE_IMAGE}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 800px'
            />
          </div>
          {(title || description) && (
            <figcaption className='text-sm text-muted-foreground text-center mt-2'>{description || title}</figcaption>
          )}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
        {children}
      </a>
    ),
  },
  renderMark: {
    bold: (text) => <strong className='font-semibold'>{text}</strong>,
    italic: (text) => <em>{text}</em>,
    underline: (text) => <u>{text}</u>,
    code: (text) => <code className='bg-muted px-1.5 py-0.5 rounded text-sm font-mono'>{text}</code>,
  },
};

export function renderRichText(document: Document, options: Options = richTextOptions) {
  return documentToReactComponents(document, options);
}
