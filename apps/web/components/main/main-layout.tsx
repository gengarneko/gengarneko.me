import { FC, ReactNode } from 'react';
import { tw } from 'twind';
import { Header } from '../header';
import { MainHeader } from './main-header';
import { MainSidebar } from './main-sidebar';
import { MainFooter } from './main-footer';

// * --------------------------------------------------------------------------- comp

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header title="gengarneko home page" />

      <div className={tw`min-h-screen flex flex-col`}>
        <MainHeader />

        <div className={tw`flex flex-col md:flex-row flex-1`}>
          <MainSidebar />
          <main className={tw`flex flex-1 justify-center`}>{children}</main>
        </div>

        <MainFooter />
      </div>
    </>
  );
};
