import { MarkdownTable, MarkdownTableOptions } from './types';

// eslint-disable-next-line complexity
export const markdownTable = (table: MarkdownTable, options?: MarkdownTableOptions) => {
  const align = options?.align || [];
  const stringLength = options?.stringLength || defaultStringLength;

  /** Character codes as symbols for alignment per column. */
  const alignments: number[] = [];
  const cellMatrix: string[][] = [];
  const sizeMatrix: number[][] = [];
  const longestCellByColumn: number[] = [];

  let mostCellsPerRow = 0;
  let rowIndex = -1;

  // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
  // do superfluous work when aligning, so optimize for aligning.
  while (++rowIndex < table.length) {
    const row: string[] = [];
    const sizes = [];
    let columnIndex = -1;

    if (table[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table[rowIndex].length;
    }

    while (++columnIndex < table[rowIndex].length) {
      const cell = serialize(table[rowIndex][columnIndex]);

      if (options?.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes[columnIndex] = size;

        if (longestCellByColumn[columnIndex] === undefined || size > longestCellByColumn[columnIndex]) {
          longestCellByColumn[columnIndex] = size;
        }
      }

      row.push(cell);
    }

    cellMatrix[rowIndex] = row;
    sizeMatrix[rowIndex] = sizes;
  }

  // Figure out which alignments to use.
  let columnIndex = -1;

  if (typeof align === 'object' && 'length' in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code = toAlignment(align);

    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code;
    }
  }

  // Inject the alignment row.
  columnIndex = -1;
  const row: string[] = [];
  const sizes: number[] = [];

  while (++columnIndex < mostCellsPerRow) {
    const code = alignments[columnIndex];
    let before = '';
    let after = '';

    if (code === 99 /* `c` */) {
      before = ':';
      after = ':';
    } else if (code === 108 /* `l` */) {
      before = ':';
    } else if (code === 114 /* `r` */) {
      after = ':';
    }

    // There *must* be at least one hyphen-minus in each alignment cell.
    let size =
      options?.alignDelimiters === false
        ? 1
        : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);

    const cell = before + '-'.repeat(size) + after;

    if (options?.alignDelimiters !== false) {
      size = before.length + size + after.length;

      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }

      sizes[columnIndex] = size;
    }

    row[columnIndex] = cell;
  }

  // Inject the alignment row.
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines: string[] = [];

  while (++rowIndex < cellMatrix.length) {
    const row = cellMatrix[rowIndex];
    const sizes = sizeMatrix[rowIndex];
    columnIndex = -1;

    const line: string[] = [];

    while (++columnIndex < mostCellsPerRow) {
      const cell = row[columnIndex] || '';
      let before = '';
      let after = '';

      if (options?.alignDelimiters !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
        const code = alignments[columnIndex];

        if (code === 114 /* `r` */) {
          before = ' '.repeat(size);
        } else if (code === 99 /* `c` */) {
          if (size % 2) {
            before = ' '.repeat(size / 2 + 0.5);
            after = ' '.repeat(size / 2 - 0.5);
          } else {
            before = ' '.repeat(size / 2);
            after = before;
          }
        } else {
          after = ' '.repeat(size);
        }
      }

      if (options?.delimiterStart !== false && !columnIndex) {
        line.push('|');
      }

      // Don’t add the opening space if we’re not aligning and the cell is empty: there will be a closing space.
      if (
        options?.padding !== false &&
        !(!options?.alignDelimiters && cell === '') &&
        (options?.delimiterStart || columnIndex)
      ) {
        line.push(' ');
      }

      if (options?.alignDelimiters) line.push(before);

      line.push(cell);

      if (options?.alignDelimiters) line.push(after);

      if (options?.padding) line.push(' ');

      if (options?.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) line.push('|');
    }

    lines.push(options?.delimiterEnd === false ? line.join('').replace(/ +$/, '') : line.join(''));
  }

  return lines.join('\n');
};

// * --------------------------------------------------------------------------- util

const serialize = (value: string | null | undefined) => (value === null || value === undefined ? '' : String(value));

const defaultStringLength = (value: string) => value.length;

const toAlignment = (value: string | null | undefined) => {
  const code = typeof value === 'string' ? value.codePointAt(0) : 0;

  return code === 67 /* `C` */ || code === 99 /* `c` */
    ? 99 /* `c` */
    : code === 76 /* `L` */ || code === 108 /* `l` */
    ? 108 /* `l` */
    : code === 82 /* `R` */ || code === 114 /* `r` */
    ? 114 /* `r` */
    : 0;
};
