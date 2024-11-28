import { usePageData, useVersion } from 'rspress/runtime';
import Theme, {
  Button,
  Search,
  SocialLinks,
  SwitchAppearance,
  useLocaleSiteData,
} from 'rspress/theme';

import { Avatar, AvatarImage } from '@/ui/avatar';
import { Button as UIButton } from '@/ui/button';

const Layout = () => <Theme.Layout beforeNavTitle={<div></div>} />;

const DEFAULT_NAV_POSITION = 'right';

export function useNavData() {
  const { nav } = useLocaleSiteData();
  const version = useVersion();
  if (Array.isArray(nav)) {
    return nav;
  }
  const navKey = version.length > 0 ? version : 'default';
  const arr = nav?.[navKey] || [];
  return [...arr];
}

const MyNav = () => {
  const { siteData } = usePageData() || {};
  const avatarLink = siteData.logo as string;
  const socialLinks = siteData?.themeConfig.socialLinks || [];
  const hasSearch = siteData?.themeConfig?.search !== false;
  const hasSocialLinks = socialLinks.length > 0;
  const hasAppearanceSwitch = siteData.themeConfig.darkMode !== false;

  const nav = useNavData();
  const getPosition = (menuItem: any) =>
    menuItem.position ?? DEFAULT_NAV_POSITION;
  const menuItems = nav.filter((item) => getPosition(item) === 'right');

  return (
    <div className='w-full grid grid-cols-3 gap-4'>
      <div className='col-start-2 flex justify-start mx-auto py-4 w-full relative'>
        <div className='flex items-center absolute left-[-80px]'>
          <Avatar>
            <AvatarImage src={avatarLink} />
          </Avatar>
        </div>

        <div className='flex flex-1 items-center justify-start'>
          {hasSearch && (
            <div className='flex sm:flex-1 items-center sm:pr-2 max-w-56'>
              <Search />
            </div>
          )}
        </div>

        <div className='flex justify-end items-center'>
          {menuItems.map((item) => (
            <UIButton
              variant={'link'}
              key={item.text}
              className='text-text-2 hover:text-text-3 mr-2'
            >
              {item.text}
            </UIButton>
          ))}

          {hasSocialLinks && (
            <div className='mr-2'>
              <SocialLinks socialLinks={socialLinks} />
            </div>
          )}

          {hasAppearanceSwitch && (
            <div className='mx-2'>
              <SwitchAppearance />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export { MyNav as Nav };

export default {
  ...Theme,
  Layout,
};

export * from 'rspress/theme';
