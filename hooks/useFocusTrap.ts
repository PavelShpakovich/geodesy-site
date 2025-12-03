import { useEffect, RefObject } from 'react';

// Track if user is using keyboard navigation
let isKeyboardUser = false;

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') isKeyboardUser = true;
  });
  window.addEventListener('mousedown', () => {
    isKeyboardUser = false;
  });
  window.addEventListener('touchstart', () => {
    isKeyboardUser = false;
  });
}

/**
 * Custom hook that traps focus within a container element for accessibility
 * Useful for modals, mobile menus, and other overlay components
 * @param ref - React ref object pointing to the container element
 * @param isActive - Whether the focus trap is active
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const element = ref.current;
    if (!element) return;

    // Get all focusable elements
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Only auto-focus for keyboard users
    if (isKeyboardUser) {
      firstElement?.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // Shift + Tab (backwards)
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      }
      // Tab (forwards)
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Trigger a custom event that the component can listen to
        element.dispatchEvent(new CustomEvent('escape-key'));
      }
    };

    element.addEventListener('keydown', handleTabKey);
    element.addEventListener('keydown', handleEscapeKey);

    return () => {
      element.removeEventListener('keydown', handleTabKey);
      element.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref, isActive]);
}
