// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { createContext } from 'react';

import { MDXProvider } from '@mdx-js/react';
import { Content, usePageData } from 'rspress/runtime';
import { Aside, getCustomMDXComponent, useLocaleSiteData } from 'rspress/theme';

import { SidebarProvider } from '@/ui/sidebar';

import { AppSidebar } from './app-sidebar';

export interface TabData {
  [key: string]: number | undefined;
}

export interface ITabDataContext {
  tabData: TabData;
  setTabData: (data: TabData) => void;
}

export const TabDataContext = createContext<ITabDataContext>({
  tabData: {},
  setTabData: () => {},
});

// import type { DocLayoutProps } from './layout';

type DocLayoutProps = any;

export const DocLayout = (props: DocLayoutProps) => {
  const [tabData, setTabData] = React.useState({});
  const { siteData, page } = usePageData();
  const { toc = [], frontmatter } = page;
  const { themeConfig } = siteData;
  const localesData = useLocaleSiteData();

  const outlineTitle =
    localesData?.outlineTitle || themeConfig?.outlineTitle || 'ON THIS PAGE';

  const mdxComponents = { ...getCustomMDXComponent(), ...props.components };

  const docContent = (
    <TabDataContext.Provider value={{ tabData, setTabData }}>
      <MDXProvider components={mdxComponents}>
        <Content />
      </MDXProvider>
    </TabDataContext.Provider>
  );

  console.log('outlineTitle', outlineTitle);

  return (
    <SidebarProvider className='w-full grid grid-cols-3 gap-4'>
      {/* sidebar */}
      <AppSidebar className='col-span-1 flex flex-col items-end' />

      {/* content */}
      <div className='col-span-1'>
        <div className='rspress-doc'>{docContent}</div>
      </div>

      {/* TOC */}
      {props.uiSwitch.showAside && (
        <div className='col-span-1'>
          <Aside headers={toc} outlineTitle={outlineTitle} />
        </div>
      )}
    </SidebarProvider>
  );
};
