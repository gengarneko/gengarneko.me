import { FC, ReactNode } from 'react';
import { Header } from '../header';
import { MainHeader } from './main-header';
import { MainSidebar } from './main-sidebar';
import { tw } from 'twind';
import { css } from 'twind/css';

// * --------------------------------------------------------------------------- comp

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header title="gengarneko home page" />

      <div className={tw`h-screen flex flex-col bg-[#F0E7DB]`}>
        <MainHeader />

        <div className={tw`flex flex-1 w-full justify-center`}>
          <MainSidebar className={tw`hidden md:block`} />

          <main className={tw`flex justify-center w-[600px] overflow-hidden ${main}`}>{children}</main>

          <MainSidebar className={tw`hidden xl:block`} />
        </div>
      </div>
    </>
  );
};

// * ---------------------------------------------------------------------------

const main = css`
  height: calc(100vh - 3rem);
`;
