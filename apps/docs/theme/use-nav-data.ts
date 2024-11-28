import { useVersion } from 'rspress/runtime';
import { useLocaleSiteData } from 'rspress/theme';

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
