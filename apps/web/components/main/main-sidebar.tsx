import { FC } from 'react';

import Link from 'next/link';
import { tw } from 'twind';

// * --------------------------------------------------------------------------- link

const menuItems = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/',
    title: 'Code',
  },
  {
    href: '/',
    title: 'Essay',
  },
  {
    href: '/',
    title: 'Github',
  },
  {
    href: '/',
    title: 'Profile',
  },
  {
    href: '/',
    title: 'Tools',
  },
];

// * --------------------------------------------------------------------------- comp

export const MainSidebar: FC<{ className?: string }> = ({ className }) => {
  return (
    <aside className={tw`w-60 flex-none pl-10 ${className}`}>
      <nav>
        <ul>
          {menuItems.map(({ href, title }, index) => (
            <li className={tw`m-2 text-[${index ? '#999' : 'black'}] hover:underline hover:text-[#333]`} key={title}>
              <Link href={href}>
                <a className={tw`flex p-2 rounded cursor-pointer`}>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
