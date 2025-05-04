import { useState, useEffect } from 'react';

const DEFAULT_DELAY = 500;

/**
 * A hook that delays the update of a value until a specified delay time has passed.
 *
 * @param {any} value - The value to be debounced.
 * @param {number} [delay=DEFAULT_DELAY] - The delay in milliseconds before updating the debounced value.
 * @return {any} - Returns the debounced value that updates only after the delay time has elapsed.
 */
function useDebounce<T>(value: T, delay: number = DEFAULT_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
