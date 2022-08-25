import { FC } from 'react';

import Link from 'next/link';
import { tw } from 'twind';

// * --------------------------------------------------------------------------- comp

export const MainHeader: FC = () => {
  return (
    <header
      className={tw`
        h-12 flex justify-center items-center border-0 border(b-2 solid black)
        bg-[#F0E7DB] font-semibold uppercase
      `}
    >
      <nav className={tw`flex justify-between w-[1024px]`}>
        <div className={tw`flex items-center`}>
          <Link href="/">
            <div className={tw`flex-none hover:cursor-pointer`}>GengarNeko Paradise</div>
          </Link>

          <div
            className={tw`
              text-xs px-2 rounded border(1 solid black)
              ml-4 mb-[-6px] animate-bounce hover:cursor-pointer  
            `}
          >
            hire me
          </div>
        </div>

        <div className={tw`flex-1 flex justify-end items-center text-sm`}>
          <MenuItem text="language" />
          <MenuItem text="theme" />

          <MenuItem text="github" onClick={() => window.open('https://github.com/gengarneko')} />
        </div>
      </nav>
    </header>
  );
};

const MenuItem: FC<{ text: string; onClick?: () => void }> = ({ text, onClick }) => {
  return (
    <div className={tw`mr-8 last:mr-0 select-none hover:cursor-pointer hover:underline`} onClick={onClick}>
      {text}
    </div>
  );
};
