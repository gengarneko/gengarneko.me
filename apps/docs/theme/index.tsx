import Theme from 'rspress/theme';

import { Layout as CustomLayout } from './layout';
import { Nav as CustomNav } from './navbar';

function Layout() {
  return <CustomLayout />;
}
function Nav() {
  return <CustomNav />;
}
export { Nav };

const setup = () => {};

export * from 'rspress/theme';

export default { ...Theme, Layout, setup };
