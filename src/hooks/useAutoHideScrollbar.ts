import { RefObject, useEffect } from 'react';

/**
 * A simple hook that adds/removes a `.scrolling` class on an element while the user is scrolling.
 * It accepts a ref and listens for `scroll` events, setting the class and removing it after a timeout.
 */
export default function useAutoHideScrollbar(ref: RefObject<HTMLElement | null>, options?: { delay?: number }) {
  const delay = (options && options.delay) || 800;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: number | undefined;

    const start = () => {
      if (!el.classList.contains('scrolling')) el.classList.add('scrolling');
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        el.classList.remove('scrolling');
      }, delay);
    };

    const onScroll = () => {
      start();
    };

    const onMouseEnter = () => {
      el.classList.add('scrolling');
    };
    const onMouseLeave = () => {
      // keep 'scrolling' while still scrolling; removing only if not scrolling
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        el.classList.remove('scrolling');
      }, delay);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    // cleanup
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      window.clearTimeout(timeoutId);
    };
  }, [ref, delay]);
}
