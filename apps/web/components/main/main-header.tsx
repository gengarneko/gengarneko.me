import { FC } from 'react';
import { tw } from 'twind';

// * --------------------------------------------------------------------------- link

// * --------------------------------------------------------------------------- comp

export const MainHeader: FC = () => {
  return (
    <header
      className={tw`
        sticky top-0 h-14 flex justify-center items-center border-0 border(b-4 solid black)
        bg-[#F0E7DB] font-semibold uppercase hover:cursor-pointer
      `}
    >
      <nav className={tw`w-[768px] flex justify-between`}>
        <div className={tw`flex-none`}>Logo</div>
        <div className={tw`flex-1 flex justify-end`}>
          <MenuItem text="profile" />
          <MenuItem text="works" />
          <MenuItem text="tech" />
          <MenuItem text="github" />
        </div>
      </nav>
    </header>
  );
};

const MenuItem: FC<{ text: string }> = ({ text }) => {
  return <div className={tw`mr-4`}>{text}</div>;
};
