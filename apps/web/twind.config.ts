import { css } from '@blog/css';
import type { Configuration } from '@blog/css';

// * --------------------------------------------------------------------------- config

const twindConfig: Configuration = {
  theme: {
    extend: {
      colors: { gainsboro: 'gainsboro' },
    },
  },
  // * ---------------------------
  preflight: (preflight) => css`
    ${preflight}
    body {
      font-family: 'Sarasa Fixed Slab CL', sans-serif;
    }
  `,
};

export default twindConfig;
