'use client';

import { useState, useRef, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { Check, AlertCircle, Star, Info, X } from 'lucide-react';
import { FORM, REVIEW_FORM, ARIA } from '@/lib/constants/text';
import { cn } from '@/lib/utils';

const initialState = {
  success: false,
  message: '',
  errors: undefined,
};

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type='button'
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className='p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded'
          aria-label={ARIA.STAR_RATING(star, 5)}
        >
          <Star
            className={cn(
              'w-8 h-8 transition-colors',
              (hoverRating || value) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
            )}
          />
        </button>
      ))}
      <input type='hidden' name='rating' value={value} />
    </div>
  );
}

interface ReviewFormProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface FormState {
  success: boolean;
  message: string;
  errors?: string[];
}

export function ReviewForm({ onClose, showCloseButton = false }: ReviewFormProps) {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, setIsPending] = useState(false);
  const [rating, setRating] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setState(initialState);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')?.toString() || '',
      location: formData.get('location')?.toString() || '',
      rating: rating,
      text: formData.get('text')?.toString() || '',
    };

    try {
      const response = await fetch('/api/contact.php?type=review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: FormState = await response.json();
      setState(result);

      if (result.success) {
        formRef.current?.reset();
        setRating(0);
        setCharCount(0);
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

  if (state.success) {
    return (
      <Card className='border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950'>
        <CardContent className='p-6 sm:p-8 flex flex-col items-center gap-4 text-center'>
          <div className='w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center'>
            <Check className='w-8 h-8 text-green-600 dark:text-green-400' />
          </div>
          <h3 className='text-xl font-bold text-green-800 dark:text-green-200'>{REVIEW_FORM.SUCCESS.TITLE}</h3>
          <p className='text-green-700 dark:text-green-300'>{REVIEW_FORM.SUCCESS.MESSAGE}</p>
          {onClose && (
            <Button variant='outline' onClick={onClose} className='mt-2'>
              {ARIA.CLOSE}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className='relative'>
        {showCloseButton && onClose && (
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-4 top-4'
            onClick={onClose}
            aria-label={ARIA.CLOSE}
          >
            <X className='w-5 h-5' />
          </Button>
        )}
        <CardTitle className='text-xl sm:text-2xl'>{REVIEW_FORM.TITLE}</CardTitle>
        <CardDescription>{REVIEW_FORM.SUBTITLE}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='p-3 sm:p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-start gap-2 sm:gap-3'>
            <Info className='h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5' />
            <p className='text-xs sm:text-sm text-blue-800 dark:text-blue-200'>{REVIEW_FORM.MODERATION_NOTICE}</p>
          </div>

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
            <Label htmlFor='review-name' className='text-sm sm:text-base'>
              {REVIEW_FORM.LABELS.NAME} <span className='text-destructive'>{FORM.REQUIRED}</span>
            </Label>
            <Input
              id='review-name'
              name='name'
              placeholder={REVIEW_FORM.PLACEHOLDERS.NAME}
              required
              minLength={2}
              maxLength={100}
              className='h-10 sm:h-11 text-sm sm:text-base'
            />
          </div>

          <div className='flex flex-col gap-1.5 sm:gap-2'>
            <Label htmlFor='review-location' className='text-sm sm:text-base'>
              {REVIEW_FORM.LABELS.LOCATION}
            </Label>
            <Input
              id='review-location'
              name='location'
              placeholder={REVIEW_FORM.PLACEHOLDERS.LOCATION}
              maxLength={100}
              className='h-10 sm:h-11 text-sm sm:text-base'
            />
          </div>

          <div className='flex flex-col gap-1.5 sm:gap-2'>
            <Label className='text-sm sm:text-base'>
              {REVIEW_FORM.LABELS.RATING} <span className='text-destructive'>{FORM.REQUIRED}</span>
            </Label>
            <StarRatingInput value={rating} onChange={setRating} />
          </div>

          <div className='flex flex-col gap-1.5 sm:gap-2'>
            <Label htmlFor='review-text' className='text-sm sm:text-base'>
              {REVIEW_FORM.LABELS.TEXT} <span className='text-destructive'>{FORM.REQUIRED}</span>
            </Label>
            <Textarea
              id='review-text'
              name='text'
              placeholder={REVIEW_FORM.PLACEHOLDERS.TEXT}
              rows={4}
              required
              minLength={20}
              maxLength={1000}
              className='resize-none text-sm sm:text-base'
              onChange={(e) => setCharCount(e.target.value.length)}
            />
            <p className='text-xs text-muted-foreground text-right'>
              {charCount}/1000 ({REVIEW_FORM.TEXT_MAX})
            </p>
          </div>

          <SubmitButton isPending={isPending} text={REVIEW_FORM.SUBMIT} loadingText={REVIEW_FORM.SUBMITTING} />
        </form>
      </CardContent>
    </Card>
  );
}
