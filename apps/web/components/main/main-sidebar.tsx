import { FC } from 'react';
import { tw } from 'twind';
import Link from 'next/link';

// * --------------------------------------------------------------------------- link

const menuItems = [
  {
    href: '/home',
    title: 'All',
  },
  {
    href: '/about',
    title: 'Frontend',
  },
  {
    href: '/contact',
    title: 'Backend',
  },
  {
    href: '/contact',
    title: 'Teamwork',
  },
];

const list2 = [
  {
    href: '/home',
    title: 'Fitness',
  },
  {
    href: '/home',
    title: 'Reading Notes',
  },
];

// * --------------------------------------------------------------------------- comp

export const MainSidebar: FC<{ className?: string }> = ({ className }) => {
  return (
    <aside className={tw`w-60 flex-none pl-10 ${className}`}>
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

        <div className={tw`w-32 h-0.5 bg-black`} />

        <ul>
          {list2.map(({ href, title }) => (
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
