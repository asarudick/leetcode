import { useState, useMemo, useEffect } from "react";

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState<T>();

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function () {
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(300);
  const value = useDebouncedValue(count, delay);

  return (
    <>
      <input type="button" value="increment" onClick={() => setCount(c => c + 1)} />
      <input type="text" value={value} />
      <input type="text" value={delay} onChange={(v) => setDelay(Math.max(1, parseInt(v.target.value === "" ? "1" : v.target.value)))} />
    </>
  )
}