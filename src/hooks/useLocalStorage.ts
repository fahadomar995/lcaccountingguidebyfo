import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const next = value instanceof Function ? value(prev) : value;
      try {
        localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
      } catch {}
      return next;
    });
  }, [key]);

  // Sync across tabs and across components in the same tab
  useEffect(() => {
    const reload = () => {
      try {
        const item = localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch {}
    };
    const onStorage = (e: StorageEvent) => { if (e.key === key) reload(); };
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === key) reload();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('local-storage', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('local-storage', onCustom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
}
