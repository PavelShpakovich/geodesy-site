'use client';

import { useState, useRef, FormEvent } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { Check, AlertCircle } from 'lucide-react';
import { FORM } from '@/lib/constants/text';

interface FormState {
  success: boolean;
  message: string;
  errors?: string[];
}

const initialState: FormState = {
  success: false,
  message: '',
  errors: undefined,
};

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setState(initialState);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: FormState = await response.json();
      setState(result);

      if (result.success) {
        formRef.current?.reset();
      }
    } catch {
      setState({
        success: false,
        message: 'Ошибка сети. Пожалуйста, попробуйте позже.',
        errors: undefined,
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4 sm:gap-5'>
          {state.success && (
            <div className='p-3 sm:p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 flex items-start gap-2 sm:gap-3'>
              <Check className='h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
              <div>
                <p className='text-xs sm:text-sm font-medium text-green-800 dark:text-green-200'>{state.message}</p>
              </div>
            </div>
          )}

          {!state.success && state.message && (
            <div className='p-3 sm:p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 flex items-start gap-2 sm:gap-3'>
              <AlertCircle className='h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-xs sm:text-sm font-medium text-red-800 dark:text-red-200'>{state.message}</p>
                {state.errors && state.errors.length > 0 && (
                  <ul className='text-xs sm:text-sm text-red-700 dark:text-red-300 list-disc list-inside flex flex-col gap-0.5'>
                    {state.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <div className='flex flex-col gap-1.5 sm:gap-2'>
            <Label htmlFor='name' className='text-sm sm:text-base'>
              {FORM.LABELS.NAME} <span className='text-destructive'>{FORM.REQUIRED}</span>
            </Label>
            <Input
              id='name'
              name='name'
              placeholder={FORM.PLACEHOLDERS.NAME}
              required
              minLength={2}
              maxLength={100}
              className='h-10 sm:h-11 text-sm sm:text-base'
            />
          </div>

          <div className='flex flex-col gap-1.5 sm:gap-2'>
            <Label htmlFor='phone' className='text-sm sm:text-base'>
              {FORM.LABELS.PHONE} <span className='text-destructive'>{FORM.REQUIRED}</span>
            </Label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              placeholder={FORM.PLACEHOLDERS.PHONE}
              required
              pattern='^\+?[0-9 \-()]{10,20}$'
              className='h-10 sm:h-11 text-sm sm:text-base'
            />
          </div>

          <div className='flex flex-col gap-1.5 sm:gap-2'>
            <Label htmlFor='email' className='text-sm sm:text-base'>
              {FORM.LABELS.EMAIL}
            </Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder={FORM.PLACEHOLDERS.EMAIL}
              className='h-10 sm:h-11 text-sm sm:text-base'
            />
          </div>

          <div className='flex flex-col gap-1.5 sm:gap-2'>
            <Label htmlFor='message' className='text-sm sm:text-base'>
              {FORM.LABELS.MESSAGE} <span className='text-destructive'>{FORM.REQUIRED}</span>
            </Label>
            <Textarea
              id='message'
              name='message'
              placeholder={FORM.PLACEHOLDERS.MESSAGE}
              rows={5}
              required
              minLength={10}
              maxLength={2000}
              className='resize-none text-sm sm:text-base'
            />
            <p className='text-xs text-muted-foreground text-right'>{FORM.MESSAGE_MAX}</p>
          </div>

          <SubmitButton isPending={isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
