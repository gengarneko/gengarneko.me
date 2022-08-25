import { FC } from 'react';
import { tw } from '@blog/css';

// * --------------------------------------------------------------------------- comp

export const MainFooter: FC = () => {
  return (
    <div
      className={tw`
        flex justify-center items-center p-6
        border-0 border(t-2 solid black)
      `}
    >
      main footer
    </div>
  );
};
