import { FC, ReactNode } from 'react';
import { Header } from '../header';
import { MainHeader } from './main-header';
import { MainSidebar } from './main-sidebar';
import { tw } from 'twind';

// * --------------------------------------------------------------------------- comp

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header title="gengarneko home page" />

      <div className={tw`h-screen flex flex-col bg-[#F0E7DB]`}>
        <MainHeader />

        <div className={tw`flex flex-1 w-full justify-center overflow-auto`}>
          <MainSidebar />
          <main className={tw`flex justify-center w-[600px] my-4`}>{children}</main>
          <MainSidebar />
        </div>
      </div>
    </>
  );
};
