import { useCallback, useState } from "react";

/**
 * Custom hook to manage localStorage state.
 * 
 * @param key - The key to store the value in localStorage
 * @param initialValue - The initial value to set if the key does not exist in localStorage
 * @returns - A tuple containing the stored value and a function to update it
 */
function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            let item = localStorage.getItem(key);

            if (item === null) {
                item = JSON.stringify(initialValue);
                localStorage.setItem(key, item);
            }

            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error reading from localStorage key ${key}: `, error);

            return initialValue;
        }
    });

    const setValue = useCallback((value: T) => {
        setStoredValue(() => {
            localStorage.setItem(key, JSON.stringify(value));
            return value;
        })
    }, [key]);

    return [storedValue, setValue] as const;
};

export default useLocalStorage;