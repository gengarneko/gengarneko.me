import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { tw } from 'twind';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const menuItems = [
    {
      href: '/home',
      title: 'Homepage',
    },
    {
      href: '/about',
      title: 'About',
    },
    {
      href: '/contact',
      title: 'Contact',
    },
  ];

  return (
    <div className={tw`min-h-screen flex flex-col`}>
      <header className={tw`bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase`}>
        Next.js sidebar menu
      </header>

      <div className={tw`flex flex-col md:flex-row flex-1`}>
        <aside className={tw`bg-fuchsia-100 w-full md:w-60`}>
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className={tw`m-2`} key={title}>
                  <Link href={href}>
                    <a className={tw`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer`}>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className={tw`flex-1`}>{children}</main>
      </div>
    </div>
  );
};
