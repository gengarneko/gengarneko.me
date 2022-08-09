"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  NotionToMarkdown: () => NotionToMarkdown
});
module.exports = __toCommonJS(src_exports);

// ../markdown-table/dist/index.mjs
var markdownTable = (table2, options) => {
  const align = (options == null ? void 0 : options.align) || [];
  const stringLength = (options == null ? void 0 : options.stringLength) || defaultStringLength;
  const alignments = [];
  const cellMatrix = [];
  const sizeMatrix = [];
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;
  while (++rowIndex < table2.length) {
    const row2 = [];
    const sizes2 = [];
    let columnIndex2 = -1;
    if (table2[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table2[rowIndex].length;
    }
    while (++columnIndex2 < table2[rowIndex].length) {
      const cell = serialize(table2[rowIndex][columnIndex2]);
      if ((options == null ? void 0 : options.alignDelimiters) !== false) {
        const size = stringLength(cell);
        sizes2[columnIndex2] = size;
        if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
          longestCellByColumn[columnIndex2] = size;
        }
      }
      row2.push(cell);
    }
    cellMatrix[rowIndex] = row2;
    sizeMatrix[rowIndex] = sizes2;
  }
  let columnIndex = -1;
  if (typeof align === "object" && "length" in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code = toAlignment(align);
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code;
    }
  }
  columnIndex = -1;
  const row = [];
  const sizes = [];
  while (++columnIndex < mostCellsPerRow) {
    const code = alignments[columnIndex];
    let before = "";
    let after = "";
    if (code === 99) {
      before = ":";
      after = ":";
    } else if (code === 108) {
      before = ":";
    } else if (code === 114) {
      after = ":";
    }
    let size = (options == null ? void 0 : options.alignDelimiters) === false ? 1 : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
    const cell = before + "-".repeat(size) + after;
    if ((options == null ? void 0 : options.alignDelimiters) !== false) {
      size = before.length + size + after.length;
      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }
      sizes[columnIndex] = size;
    }
    row[columnIndex] = cell;
  }
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines = [];
  while (++rowIndex < cellMatrix.length) {
    const row2 = cellMatrix[rowIndex];
    const sizes2 = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line = [];
    while (++columnIndex < mostCellsPerRow) {
      const cell = row2[columnIndex] || "";
      let before = "";
      let after = "";
      if ((options == null ? void 0 : options.alignDelimiters) !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
        const code = alignments[columnIndex];
        if (code === 114) {
          before = " ".repeat(size);
        } else if (code === 99) {
          if (size % 2) {
            before = " ".repeat(size / 2 + 0.5);
            after = " ".repeat(size / 2 - 0.5);
          } else {
            before = " ".repeat(size / 2);
            after = before;
          }
        } else {
          after = " ".repeat(size);
        }
      }
      if ((options == null ? void 0 : options.delimiterStart) !== false && !columnIndex) {
        line.push("|");
      }
      if ((options == null ? void 0 : options.padding) !== false && !(!(options == null ? void 0 : options.alignDelimiters) && cell === "") && ((options == null ? void 0 : options.delimiterStart) || columnIndex)) {
        line.push(" ");
      }
      if (options == null ? void 0 : options.alignDelimiters)
        line.push(before);
      line.push(cell);
      if (options == null ? void 0 : options.alignDelimiters)
        line.push(after);
      if (options == null ? void 0 : options.padding)
        line.push(" ");
      if ((options == null ? void 0 : options.delimiterEnd) !== false || columnIndex !== mostCellsPerRow - 1)
        line.push("|");
    }
    lines.push((options == null ? void 0 : options.delimiterEnd) === false ? line.join("").replace(/ +$/, "") : line.join(""));
  }
  return lines.join("\n");
};
var serialize = (value) => value === null || value === void 0 ? "" : String(value);
var defaultStringLength = (value) => value.length;
var toAlignment = (value) => {
  const code = typeof value === "string" ? value.codePointAt(0) : 0;
  return code === 67 || code === 99 ? 99 : code === 76 || code === 108 ? 108 : code === 82 || code === 114 ? 114 : 0;
};

// src/utils/markdown.ts
var heading1 = (text) => `# ${text}`;
var heading2 = (text) => `## ${text}`;
var heading3 = (text) => `### ${text}`;
var inlineCode = (text) => `\`${text}\``;
var bold = (text) => `**${text}**`;
var italic = (text) => `_${text}_`;
var strikethrough = (text) => `~~${text}~~`;
var underline = (text) => `<u>${text}</u>`;
var link = (text, href) => `[${text}](${href})`;
var bullet = (text, count) => count ? `${count}. ${text.trim()}` : `- ${text.trim()}`;
var todo = (text, checked) => checked ? `- [x] ${text}` : `- [ ] ${text}`;
var image = (alt, href) => `![${alt}](${href})`;
var divider = () => "---";
var table = (cells) => markdownTable(cells);
var codeBlock = (text, language) => {
  return `\`\`\`${language === "plain text" ? "text" : language}
${text}
\`\`\``;
};
var quote = (text) => {
  return `> ${text.replace(/\n/g, "  \n> ")}`;
};
var callout = (text, icon) => {
  let emoji;
  if ((icon == null ? void 0 : icon.type) === "emoji") {
    emoji = icon.emoji;
  }
  return `> ${emoji ? emoji + " " : ""}${text.replace(/\n/g, "  \n> ")}`;
};
var addTabSpace = (text, n = 0) => {
  const tab = "	";
  let result = "";
  for (let i = 0; i < n; i++) {
    if (text.includes("\n")) {
      const multiLineText = text.split(/(?<=\n)/).join(tab);
      result = tab + multiLineText;
    } else
      result = tab + text;
  }
  return result;
};
var toggle = (summary, children) => {
  if (!summary)
    return children || "";
  return `<details>
  <summary>${summary}</summary>

${children || ""}

  </details>`;
};

// src/utils/notion.ts
var getBlockChildren = async (notionClient, block_id, totalPage) => {
  try {
    let result = [];
    let pageCount = 0;
    let start_cursor;
    do {
      const response = await notionClient.blocks.children.list({
        start_cursor,
        block_id
      });
      result.push(...response.results);
      start_cursor = response == null ? void 0 : response.next_cursor;
      pageCount += 1;
    } while (start_cursor !== null && (totalPage === null || pageCount < totalPage));
    modifyNumberedListObject(result);
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};
var modifyNumberedListObject = (blocks) => {
  let numberedListIndex = 0;
  for (const block of blocks) {
    if ("type" in block && block.type === "numbered_list_item") {
      block.numbered_list_item.number = ++numberedListIndex;
    } else {
      numberedListIndex = 0;
    }
  }
};

// src/index.ts
var NotionToMarkdown = class {
  constructor(options) {
    this.notionClient = options.notionClient;
    this.transformers = {};
  }
  setTransformer(type, transformer) {
    this.transformers[type] = transformer;
    return this;
  }
  toMarkdownString(mdBlocks = [], nestingLevel = 0) {
    let mdString = "";
    mdBlocks.forEach((mdBlocks2) => {
      if (mdBlocks2.parent) {
        if (mdBlocks2.type !== "to_do" && mdBlocks2.type !== "bulleted_list_item" && mdBlocks2.type !== "numbered_list_item") {
          mdString += `
${addTabSpace(mdBlocks2.parent, nestingLevel)}

`;
        } else {
          mdString += `${addTabSpace(mdBlocks2.parent, nestingLevel)}
`;
        }
      }
      if (mdBlocks2.children && mdBlocks2.children.length > 0) {
        if (mdBlocks2.type === "synced_block") {
          mdString += this.toMarkdownString(mdBlocks2.children, nestingLevel);
        } else {
          mdString += this.toMarkdownString(mdBlocks2.children, nestingLevel + 1);
        }
      }
    });
    return mdString;
  }
  async pageToMarkdown(id, totalPage = null) {
    if (!this.notionClient) {
      throw new Error(
        "notion client is not provided, for more details check out https://github.com/souvikinator/notion-to-md"
      );
    }
    const blocks = await getBlockChildren(this.notionClient, id, totalPage);
    return await this.blocksToMarkdown(blocks);
  }
  async blocksToMarkdown(blocks, totalPage = null, mdBlocks = []) {
    if (!this.notionClient) {
      throw new Error(
        "notion client is not provided, for more details check out https://github.com/souvikinator/notion-to-md"
      );
    }
    if (!blocks)
      return mdBlocks;
    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i];
      if ("has_children" in block && block.has_children && block.type !== "column_list" && block.type !== "toggle" && block.type !== "callout") {
        let child_blocks = await getBlockChildren(this.notionClient, block.id, totalPage);
        mdBlocks.push({
          type: block.type,
          parent: await this.blockToMarkdown(block),
          children: []
        });
        let l = mdBlocks.length;
        await this.blocksToMarkdown(child_blocks, totalPage, mdBlocks[l - 1].children);
        continue;
      }
      let tmp = await this.blockToMarkdown(block);
      mdBlocks.push({ type: block.type, parent: tmp, children: [] });
    }
    return mdBlocks;
  }
  async blockToMarkdown(block) {
    var _a;
    if (typeof block !== "object" || !("type" in block))
      return "";
    let parsedData = "";
    const { type } = block;
    if (type in this.transformers && !!this.transformers[type])
      return this.transformers[type](block);
    switch (type) {
      case "image":
        {
          let blockContent = block.image;
          const image_caption_plain = blockContent.caption.map((item) => item.plain_text).join("");
          const image_type = blockContent.type;
          if (image_type === "external")
            return image(image_caption_plain, blockContent.external.url);
          if (image_type === "file")
            return image(image_caption_plain, blockContent.file.url);
        }
        break;
      case "divider": {
        return divider();
      }
      case "equation": {
        return codeBlock(block.equation.expression);
      }
      case "video":
      case "file":
      case "pdf":
        {
          let blockContent;
          if (type === "video")
            blockContent = block.video;
          if (type === "file")
            blockContent = block.file;
          if (type === "pdf")
            blockContent = block.pdf;
          if (blockContent) {
            const file_type = blockContent.type;
            if (file_type === "external")
              return link("image", blockContent.external.url);
            if (file_type === "file")
              return link("image", blockContent.file.url);
          }
        }
        break;
      case "bookmark":
      case "embed":
      case "link_preview":
      case "link_to_page":
      case "child_page":
      case "child_database":
        {
          let blockContent;
          let title = type;
          if (type === "bookmark")
            blockContent = block.bookmark;
          if (type === "embed")
            blockContent = block.embed;
          if (type === "link_preview")
            blockContent = block.link_preview;
          if (type === "link_to_page" && block.link_to_page.type === "page_id") {
            blockContent = { url: block.link_to_page.page_id };
          }
          if (type === "child_page") {
            blockContent = { url: block.id };
            title = block.child_page.title;
          }
          if (type === "child_database") {
            blockContent = { url: block.id };
            title = block.child_database.title || "child_database";
          }
          if (blockContent)
            return link(title, blockContent.url);
        }
        break;
      case "table": {
        const { id, has_children } = block;
        let tableArr = [];
        if (has_children) {
          const tableRows = await getBlockChildren(this.notionClient, id, 100);
          let rowsPromise = tableRows == null ? void 0 : tableRows.map(async (row) => {
            const { type: type2 } = row;
            const cells = row[type2]["cells"];
            let cellStringPromise = cells.map(async (cell) => {
              const block2 = { type: "paragraph", paragraph: { rich_text: cell } };
              await this.blockToMarkdown(block2);
            });
            const cellStringArr = await Promise.all(cellStringPromise);
            tableArr.push(cellStringArr);
          });
          await Promise.all(rowsPromise || []);
        }
        return table(tableArr);
      }
      case "column_list": {
        const { id, has_children } = block;
        if (!has_children)
          return "";
        const column_list_children = await getBlockChildren(this.notionClient, id, 100);
        let column_list_promise = column_list_children.map(async (column) => await this.blockToMarkdown(column));
        let column_list = await Promise.all(column_list_promise);
        return column_list.join("\n\n");
      }
      case "column": {
        const { id, has_children } = block;
        if (!has_children)
          return "";
        const column_children = await getBlockChildren(this.notionClient, id, 100);
        const column_children_promise = column_children.map(
          async (column_child) => await this.blockToMarkdown(column_child)
        );
        let column = await Promise.all(column_children_promise);
        return column.join("\n\n");
      }
      case "toggle": {
        const { id, has_children } = block;
        const toggle_summary = (_a = block.toggle.rich_text[0]) == null ? void 0 : _a.plain_text;
        if (!has_children) {
          return toggle(toggle_summary);
        }
        const toggle_children_object = await getBlockChildren(this.notionClient, id, 100);
        const toggle_children = await this.blocksToMarkdown(toggle_children_object);
        const toggle_children_md_string = this.toMarkdownString(toggle_children);
        return toggle(toggle_summary, toggle_children_md_string);
      }
      default: {
        let blockContent = block[type].text || block[type].rich_text || [];
        blockContent.map((content) => {
          const annotations = content.annotations;
          let plain_text = content.plain_text;
          plain_text = this.annotatePlainText(plain_text, annotations);
          if (content["href"])
            plain_text = link(plain_text, content["href"]);
          parsedData += plain_text;
        });
      }
    }
    switch (type) {
      case "code":
        parsedData = codeBlock(parsedData, block[type].language);
        break;
      case "heading_1":
        parsedData = heading1(parsedData);
        break;
      case "heading_2":
        parsedData = heading2(parsedData);
        break;
      case "heading_3":
        parsedData = heading3(parsedData);
        break;
      case "quote":
        parsedData = quote(parsedData);
        break;
      case "callout":
        {
          const { id, has_children } = block;
          let callout_string = "";
          if (!has_children) {
            return callout(parsedData, block[type].icon);
          }
          const callout_children_object = await getBlockChildren(this.notionClient, id, 100);
          const callout_children = await this.blocksToMarkdown(callout_children_object);
          callout_string += `${parsedData}
`;
          callout_children.forEach((child) => {
            callout_string += `${child.parent}

`;
          });
          parsedData = callout(callout_string.trim(), block[type].icon);
        }
        break;
      case "bulleted_list_item":
        parsedData = bullet(parsedData);
        break;
      case "numbered_list_item":
        parsedData = bullet(parsedData, block.numbered_list_item.number);
        break;
      case "to_do":
        parsedData = todo(parsedData, block.to_do.checked);
        break;
    }
    return parsedData;
  }
  annotatePlainText(text, annotations) {
    if (text.match(/^\s*$/))
      return text;
    const leadingSpaceMatch = text.match(/^(\s*)/);
    const trailingSpaceMatch = text.match(/(\s*)$/);
    const leading_space = leadingSpaceMatch ? leadingSpaceMatch[0] : "";
    const trailing_space = trailingSpaceMatch ? trailingSpaceMatch[0] : "";
    let newText = text.trim();
    if (text !== "") {
      if (annotations.code)
        newText = inlineCode(text);
      if (annotations.bold)
        newText = bold(text);
      if (annotations.italic)
        newText = italic(text);
      if (annotations.strikethrough)
        newText = strikethrough(text);
      if (annotations.underline)
        newText = underline(text);
    }
    return leading_space + newText + trailing_space;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NotionToMarkdown
});
