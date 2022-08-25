export type MarkdownTableCell = string | null | undefined;

export type MarkdownTable = MarkdownTableCell[][];

export interface MarkdownTableOptions {
  /**
   * One style for all columns, or styles for their respective columns.
   *
   * Each style is either `'l'` (left), `'r'` (right), or `'c'` (center).
   * Other values are treated as `''`, which doesn't place the colon in the alignment row but does align left.
   *
   * Only the lowercase first character is used, so `Right` is fine.*
   */
  align?: string | (string | null | undefined)[] | null;
  /**
   * Whether to add a space of padding between delimiters and cells.
   */
  padding?: boolean;
  /**
   * Whether to begin each row with the delimiter.
   */
  delimiterStart?: boolean;
  /**
   * Whether to end each row with the delimiter.
   */
  delimiterEnd?: boolean;
  /**
   * Whether to align the delimiters.
   *
   * By default, they are aligned.
   */
  alignDelimiters?: boolean;
  /**
   * Function to detect the length of table cell content.
   *
   * This is used when aligning the delimiters (`|`) between table cells.
   * Full-width characters and emoji mess up delimiter alignment when viewing
   * the markdown source.
   *
   * To fix this, you can pass this function, which receives the cell content
   * and returns its "visible" size.
   *
   * With [`string-width`](https://github.com/sindresorhus/string-width)
   *
   * Note that what is and isn't visible depends on where the text is displayed.
   */
  stringLength?: (value: string) => number;
}
