import { getGPUTier } from 'detect-gpu';
import React from 'react';

/**
 * This hook is used to get the GPU tier of the user.
 * It is used to determine if the user should see the WebGL warning or not.
 * @returns The GPU tier and loading state
 */
const useGPUTier = () => {
  const [tier, setTier] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getGPUTier()
      .then((result) => {
        setTier(result.tier as number);
        setLoading(false);
      })
      .catch(() => {
        setTier(0);
        setLoading(false);
      });
  }, [setTier]);

  return { tier, loading };
};

export default useGPUTier;
