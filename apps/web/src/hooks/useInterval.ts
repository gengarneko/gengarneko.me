import React from 'react';

const useInterval = (callback: () => unknown, delay = 1000) => {
  const savedCallback = React.useRef<() => unknown>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    const id = setInterval(tick, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

export default useInterval;
