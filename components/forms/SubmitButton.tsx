'use client';

import { Button } from '@/components/ui/Button';
import { Loader2, Send } from 'lucide-react';
import { FORM } from '@/lib/constants/text';

interface SubmitButtonProps {
  text?: string;
  loadingText?: string;
  isPending?: boolean;
}

export function SubmitButton({ text, loadingText, isPending = false }: SubmitButtonProps) {
  const buttonText = text || FORM.SUBMIT;
  const buttonLoadingText = loadingText || FORM.SUBMITTING;

  return (
    <Button
      type='submit'
      size='lg'
      className='w-full text-sm sm:text-base h-11 sm:h-12 cursor-pointer'
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          <span>{buttonLoadingText}</span>
        </>
      ) : (
        <>
          <Send className='mr-2 h-4 w-4' />
          <span>{buttonText}</span>
        </>
      )}
    </Button>
  );
}
