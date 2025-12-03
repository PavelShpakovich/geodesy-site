'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Star, Quote, ChevronLeft, ChevronRight, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { ReviewForm } from '@/components/forms/ReviewForm';
import { SECTIONS, REVIEW_FORM, ARIA } from '@/lib/constants/text';

interface Review {
  id: string;
  authorName: string;
  authorLocation?: string;
  text: string;
  rating: number;
  date: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showLeaveReviewCTA?: boolean;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className='flex gap-0.5'>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={cn('w-4 h-4', i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')} />
      ))}
    </div>
  );
}

export function ReviewsSection({
  reviews,
  className,
  autoPlay = true,
  autoPlayInterval = 5000,
  showLeaveReviewCTA = true,
}: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
    });
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Touch/Mouse handlers for swipe
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const diff = clientX - startX;
      setDragOffset(diff);
    },
    [isDragging, startX]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50; // minimum swipe distance
    if (dragOffset > threshold) {
      goToPrev();
    } else if (dragOffset < -threshold) {
      goToNext();
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, goToPrev, goToNext]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
    setIsHovered(false);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered || isDragging || reviews.length <= 1) return;

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, isDragging, goToNext, reviews.length]);

  if (reviews.length === 0) return null;

  const translateX = -currentIndex * 100 + (dragOffset / (containerRef.current?.offsetWidth || 1)) * 100;

  return (
    <section className={cn('flex flex-col gap-8', className)}>
      <div className='text-center flex flex-col gap-3'>
        <h2 className='text-2xl sm:text-3xl font-bold'>{SECTIONS.REVIEWS.TITLE}</h2>
        <p className='text-muted-foreground'>{SECTIONS.REVIEWS.SUBTITLE}</p>
      </div>

      <div className='relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}>
        {/* Navigation Buttons */}
        {reviews.length > 1 && (
          <>
            <Button
              variant='outline'
              size='icon'
              className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden sm:flex rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background'
              onClick={goToPrev}
              aria-label={ARIA.PREV_REVIEW}
            >
              <ChevronLeft className='h-5 w-5' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden sm:flex rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background'
              onClick={goToNext}
              aria-label={ARIA.NEXT_REVIEW}
            >
              <ChevronRight className='h-5 w-5' />
            </Button>
          </>
        )}

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className='overflow-hidden px-4 sm:px-12 cursor-grab active:cursor-grabbing'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={cn('flex', !isDragging && 'transition-transform duration-500 ease-in-out')}
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className='w-full shrink-0 px-1 sm:px-2'>
                <Card className='mx-auto max-w-2xl shadow-lg select-none'>
                  <CardContent className='p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 relative'>
                    <Quote className='absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary/10' />

                    <div className='flex justify-center'>
                      <StarRating rating={review.rating} />
                    </div>

                    <p className='text-sm sm:text-base md:text-lg text-center text-muted-foreground leading-relaxed italic'>
                      &ldquo;{review.text}&rdquo;
                    </p>

                    <div className='flex flex-col items-center gap-1 pt-3 sm:pt-4 border-t'>
                      <p className='font-semibold text-sm sm:text-base'>{review.authorName}</p>
                      <div className='flex items-center gap-2 text-xs sm:text-sm text-muted-foreground'>
                        {review.authorLocation && <span>{review.authorLocation}</span>}
                        {review.authorLocation && <span>•</span>}
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {reviews.length > 1 && (
          <div className='flex justify-center gap-2 mt-6'>
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                  index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                )}
                aria-label={ARIA.GO_TO_REVIEW(index + 1)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Leave Review CTA */}
      {showLeaveReviewCTA && (
        <div className='bg-muted/50 rounded-lg p-4 sm:p-6 md:p-8 text-center flex flex-col gap-3 sm:gap-4'>
          <h3 className='text-base sm:text-lg md:text-xl font-semibold'>{REVIEW_FORM.CTA.TITLE}</h3>
          <p className='text-xs sm:text-sm md:text-base text-muted-foreground'>{REVIEW_FORM.CTA.SUBTITLE}</p>
          <div>
            <Button onClick={() => setIsModalOpen(true)} className='gap-2'>
              <PenLine className='w-4 h-4' />
              {REVIEW_FORM.CTA.BUTTON}
            </Button>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ReviewForm onClose={() => setIsModalOpen(false)} showCloseButton />
      </Modal>
    </section>
  );
}
