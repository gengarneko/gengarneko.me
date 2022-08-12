import { FC } from 'react';
import { tw } from 'twind';
import Link from 'next/link';

// * --------------------------------------------------------------------------- link

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

// * --------------------------------------------------------------------------- comp

export const MainSidebar: FC = () => {
  return (
    <aside className={tw`hidden md:block`}>
      <nav>
        <ul>
          {menuItems.map(({ href, title }) => (
            <li className={tw`m-2`} key={title}>
              <Link href={href}>
                <a className={tw`flex p-2 rounded hover:bg-fuchsia-400 cursor-pointer`}>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
