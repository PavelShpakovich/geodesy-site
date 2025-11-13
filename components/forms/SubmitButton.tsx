'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { FORM } from '@/lib/constants/text';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' size='lg' className='w-full text-sm sm:text-base h-11 sm:h-12' disabled={pending}>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          <span>{FORM.SUBMITTING}</span>
        </>
      ) : (
        <>
          <Send className='mr-2 h-4 w-4' />
          <span>{FORM.SUBMIT}</span>
        </>
      )}
    </Button>
  );
}
