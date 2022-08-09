markdown-table
Build Coverage Downloads Size

Generate a markdown (GFM) table.

Contents
What is this?
When should I use this?
Install
Use
API
markdownTable(table[, options])
Types
Compatibility
Security
Inspiration
Contribute
License
What is this?
This is a simple package that takes table data and generates a GitHub flavored markdown (GFM) table.

When should I use this?
You can use this package when you want to generate the source code of a GFM table from some data.

This is a simple solution in that it doesn’t handle escapes or HTML or any of that. For a complete but heavier solution, build an AST and serialize it with mdast-util-to-markdown (with mdast-util-gfm).

Install
This package is ESM only. In Node.js (version 12.20+, 14.14+, or 16.0+), install with npm:

npm install markdown-table
In Deno with esm.sh:

import {markdownTable} from 'https://esm.sh/markdown-table@3'
In browsers with esm.sh:

<script type="module">
  import {markdownTable} from 'https://esm.sh/markdown-table@3?bundle'
</script>
Use
Typical usage (defaults to align left):

import {markdownTable} from 'markdown-table'

markdownTable([
['Branch', 'Commit'],
['main', '0123456789abcdef'],
['staging', 'fedcba9876543210']
])
Yields:

| Branch  | Commit           |
| ------- | ---------------- |
| main    | 0123456789abcdef |
| staging | fedcba9876543210 |
With align:

markdownTable(
[
['Beep', 'No.', 'Boop'],
['beep', '1024', 'xyz'],
['boop', '3388450', 'tuv'],
['foo', '10106', 'qrstuv'],
['bar', '45', 'lmno']
],
{align: ['l', 'c', 'r']}
)
Yields:

| Beep |   No.   |   Boop |
| :--- | :-----: | -----: |
| beep |   1024  |    xyz |
| boop | 3388450 |    tuv |
| foo  |  10106  | qrstuv |
| bar  |    45   |   lmno |
API
This package exports the following identifiers: markdownTable. There is no default export.

markdownTable(table[, options])
Generate a markdown table from table data (matrix of strings).

options
Configuration (optional).

options.align
One style for all columns, or styles for their respective columns (string or Array<string>). Each style is either 'l' (left), 'r' (right), or 'c' (center). Other values are treated as '', which doesn’t place the colon in the alignment row but does align left. Only the lowercased first character is used, so Right is fine.

options.padding
Whether to add a space of padding between delimiters and cells (boolean, default: true).

When true, there is padding:

| Alpha | B     |
| ----- | ----- |
| C     | Delta |
When false, there is no padding:

|Alpha|B    |
|-----|-----|
|C    |Delta|
options.delimiterStart
Whether to begin each row with the delimiter (boolean, default: true).

👉 Note: please don’t use this: it could create fragile structures that aren’t understandable to some markdown parsers.

When true, there are starting delimiters:

| Alpha | B     |
| ----- | ----- |
| C     | Delta |
When false, there are no starting delimiters:

Alpha | B     |
----- | ----- |
C     | Delta |
options.delimiterEnd
Whether to end each row with the delimiter (boolean, default: true).

👉 Note: please don’t use this: it could create fragile structures that aren’t understandable to some markdown parsers.

When true, there are ending delimiters:

| Alpha | B     |
| ----- | ----- |
| C     | Delta |
When false, there are no ending delimiters:

| Alpha | B
| ----- | -----
| C     | Delta
options.alignDelimiters
Whether to align the delimiters (boolean, default: true). By default, they are aligned:

| Alpha | B     |
| ----- | ----- |
| C     | Delta |
Pass false to make them staggered:

| Alpha | B |
| - | - |
| C | Delta |
options.stringLength
Function to detect the length of table cell content (Function, default: s => s.length). This is used when aligning the delimiters (|) between table cells. Full-width characters and emoji mess up delimiter alignment when viewing the markdown source. To fix this, you can pass this function, which receives the cell content and returns its “visible” size. Note that what is and isn’t visible depends on where the text is displayed.

Without such a function, the following:

markdownTable([
['Alpha', 'Bravo'],
['中文', 'Charlie'],
['👩‍❤️‍👩', 'Delta']
])
Yields:

| Alpha | Bravo |
| - | - |
| 中文 | Charlie |
| 👩‍❤️‍👩 | Delta |
With string-width:

import stringWidth from 'string-width'

markdownTable(
[
['Alpha', 'Bravo'],
['中文', 'Charlie'],
['👩‍❤️‍👩', 'Delta']
],
{stringLength: stringWidth}
)
Yields:

| Alpha | Bravo   |
| ----- | ------- |
| 中文  | Charlie |
| 👩‍❤️‍👩    | Delta   |
Types
This package is fully typed with TypeScript. It exports additional Options type that models its respective interface.

Compatibility
This package is at least compatible with all maintained versions of Node.js. As of now, that is Node.js 12.20+, 14.14+, and 16.0+. It also works in Deno and modern browsers.

Security
This package is safe.

Inspiration
The original idea and basic implementation was inspired by James Halliday’s text-table library.

Contribute
Yes please! See How to Contribute to Open Source.

License
MIT © Titus Wormer