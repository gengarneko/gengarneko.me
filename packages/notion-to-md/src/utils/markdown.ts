import { CalloutIcon } from '../types';
import { markdownTable } from '@gengarneko/markdown-table';

export const heading1 = (text: string) => `# ${text}`;
export const heading2 = (text: string) => `## ${text}`;
export const heading3 = (text: string) => `### ${text}`;

export const inlineCode = (text: string) => `\`${text}\``;
export const bold = (text: string) => `**${text}**`;
export const italic = (text: string) => `_${text}_`;
export const strikethrough = (text: string) => `~~${text}~~`;
export const underline = (text: string) => `<u>${text}</u>`;
export const link = (text: string, href: string) => `[${text}](${href})`;
export const bullet = (text: string, count?: number) => (count ? `${count}. ${text.trim()}` : `- ${text.trim()}`);
export const todo = (text: string, checked: boolean) => (checked ? `- [x] ${text}` : `- [ ] ${text}`);
export const image = (alt: string, href: string) => `![${alt}](${href})`;
export const divider = () => '---';

export const table = (cells: string[][]) => markdownTable(cells);

export const codeBlock = (text: string, language?: string) => {
  return `\`\`\`${language === 'plain text' ? 'text' : language}
${text}
\`\`\``;
};

export const quote = (text: string) => {
  // the replace is done to handle multiple lines
  return `> ${text.replace(/\n/g, '  \n> ')}`;
};

export const callout = (text: string, icon?: CalloutIcon) => {
  let emoji: string | undefined;
  if (icon?.type === 'emoji') {
    emoji = icon.emoji;
  }
  // the replace is done to handle multiple lines
  return `> ${emoji ? emoji + ' ' : ''}${text.replace(/\n/g, '  \n> ')}`;
};

export const addTabSpace = (text: string, n = 0) => {
  const tab = '	';
  let result = '';

  for (let i = 0; i < n; i++) {
    if (text.includes('\n')) {
      const multiLineText = text.split(/(?<=\n)/).join(tab);
      result = tab + multiLineText;
    } else result = tab + text;
  }
  return result;
};

export const toggle = (summary?: string, children?: string) => {
  if (!summary) return children || '';
  return `<details>
  <summary>${summary}</summary>

${children || ''}

  </details>`;
};
