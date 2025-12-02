'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Link2, Check } from 'lucide-react';
import { PAGES } from '@/lib/constants/text';

interface CopyLinkButtonProps {
  className?: string;
}

export function CopyLinkButton({ className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button variant='ghost' size='sm' onClick={handleCopy} className={className}>
      {copied ? (
        <>
          <Check className='h-4 w-4 mr-1.5' />
          <span className='text-sm'>{PAGES.BLOG.COPIED}</span>
        </>
      ) : (
        <>
          <Link2 className='h-4 w-4 mr-1.5' />
          <span className='text-sm'>{PAGES.BLOG.COPY_LINK}</span>
        </>
      )}
    </Button>
  );
}
