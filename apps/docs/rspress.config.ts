import * as path from 'node:path';

import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'GengarNeko',
  icon: './public/rspress-icon.png',
  logo: 'https://gravatar.com/avatar/237cbf6b0482ea079b8c98e85e2685a2?size=256&cache=1730712269518',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/gengarneko',
      },
    ],
  },
  globalStyles: path.join(__dirname, 'styles/index.css'),
  globalUIComponents: [
    [
      path.join(__dirname, 'components', 'footer.tsx'),
      {
        foo: 'bar',
      },
    ],
  ],
});
