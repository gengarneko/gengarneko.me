import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

interface BlockAttributes {
    numbered_list_item?: {
        number?: number;
    };
}
declare type ListBlockChildrenResponseResults = ListBlockChildrenResponse['results'] & BlockAttributes;
declare type ListBlockChildrenResponseResult = ListBlockChildrenResponseResults[0] & BlockAttributes;
interface MdBlock {
    type?: string;
    parent: string;
    children: MdBlock[];
}
interface Annotations {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: 'default' | 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'red' | 'gray_background' | 'brown_background' | 'orange_background' | 'yellow_background' | 'green_background' | 'blue_background' | 'purple_background' | 'pink_background' | 'red_background';
}
declare type CustomTransformer = (block: ListBlockChildrenResponseResult) => string | Promise<string>;

/**
 * Converts a Notion page to Markdown.
 */
declare class NotionToMarkdown {
    private readonly notionClient;
    private readonly transformers;
    private constructor();
    /**
     * Converts Markdown Blocks to string
     */
    setTransformer(type: string, transformer: CustomTransformer): NotionToMarkdown;
    toMarkdownString(mdBlocks?: MdBlock[], nestingLevel?: number): string;
    /**
     * Retrieves Notion Blocks based on ID and converts them to Markdown Blocks
     */
    pageToMarkdown(id: string, totalPage?: number | null): Promise<MdBlock[]>;
    /**
     * Converts list of Notion Blocks to Markdown Blocks
     */
    blocksToMarkdown(blocks?: ListBlockChildrenResponseResults, totalPage?: number | null, mdBlocks?: MdBlock[]): Promise<MdBlock[]>;
    /**
     * Converts a Notion Block to a Markdown Blocks
     */
    blockToMarkdown(block: ListBlockChildrenResponseResult): Promise<string>;
    /**
     * Annotate text using provided annotations
     */
    annotatePlainText(text: string, annotations: Annotations): string;
}

export { NotionToMarkdown };
