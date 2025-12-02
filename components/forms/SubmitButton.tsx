'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Loader2, Send } from 'lucide-react';
import { FORM } from '@/lib/constants/text';

interface SubmitButtonProps {
  text?: string;
  loadingText?: string;
}

export function SubmitButton({ text, loadingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const buttonText = text || FORM.SUBMIT;
  const buttonLoadingText = loadingText || FORM.SUBMITTING;

  return (
    <Button
      type='submit'
      size='lg'
      className='w-full text-sm sm:text-base h-11 sm:h-12 cursor-pointer'
      disabled={pending}
    >
      {pending ? (
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
