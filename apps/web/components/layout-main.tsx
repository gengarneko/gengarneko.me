import { FC, ReactNode } from 'react';
import { LayoutNavbar } from './layout-navbar';
import { LayoutFooter } from './layout-footer';

export const LayoutMain: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <LayoutNavbar />
      {children}
      <LayoutFooter />
    </>
  );
};
