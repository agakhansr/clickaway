import { useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a callback when clicking outside of the referenced element
 * @param callback - Function to call when clicking outside
 * @param enabled - Whether the hook should be active (default: true)
 * @returns A ref to attach to your component
 *
 * @example
 * const ref = useOutsideClick(() => {
 *   console.log('Clicked outside!');
 * });
 *
 * return <div ref={ref}>My Component</div>;
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  enabled: boolean = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, enabled]);

  return ref;
}

export default useOutsideClick;
