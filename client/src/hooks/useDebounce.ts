import { useState, useEffect } from 'react';

const DEFAULT_DELAY = 500;

function useDebounce<T>(value: T, delay = DEFAULT_DELAY) {
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
