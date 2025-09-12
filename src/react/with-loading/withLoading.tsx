import { useState, useEffect, ComponentType } from "react";

type Options = {
  delay: number;
};

export function withLoading<P>(Wrapped: ComponentType<P & { isLoading: boolean }>, options: Options) {
  const { delay = 0 } = options;
  function WithLoading(props: P & {data: any}) {
    const [spinning, setSpinning] = useState(delay > 0);
    useEffect(() => {
      if (!delay) return;
      const id = setTimeout(() => setSpinning(false), delay);
      return () => clearTimeout(id);

    }, [delay]);
    const isLoading = props.data === undefined || spinning;
    const { data, ...rest } = props;
    return <Wrapped {...(rest as P)} isLoading={isLoading} />;
  }

  WithLoading.displayName = `withLoading(${Wrapped.displayName || 'Component'})`;
  return WithLoading;
}