import type { ShikiTransformer } from 'shiki'

interface DiffInfo {
  add: number[]
  remove: number[]
  highlight: number[]
}

/**
 * 解析差异字符串以提取添加、删除和高亮行的信息
 * @param meta - 包含差异信息的元数据字符串
 * @returns 包含添加、删除和高亮行号的对象
 */
function parseDiffString(meta: string): DiffInfo {
  const result: DiffInfo = { add: [], remove: [], highlight: [] }
  const addMatch = /add\{([\d,-]+)\}/.exec(meta)
  const removeMatch = /remove\{([\d,-]+)\}/.exec(meta)
  const highlightMatch = /highlight\{([\d,-]+)\}/.exec(meta)

  if (addMatch) {
    if (addMatch[1]) {
      result.add = parseRanges(addMatch[1])
    }
  }
  if (removeMatch) {
    if (removeMatch[1]) {
      result.remove = parseRanges(removeMatch[1])
    }
  }
  if (highlightMatch) {
    if (highlightMatch[1]) {
      result.highlight = parseRanges(highlightMatch[1])
    }
  }

  return result
}

/**
 * 解析范围字符串以提取行号数组
 * @param rangeString - 包含范围的字符串
 * @returns 包含行号的数组
 */
function parseRanges(rangeString: string): number[] {
  return rangeString.split(',').flatMap((v) => {
    const [start, end] = v.split('-').map((n) => parseInt(n, 10))
    if (start === undefined) return []
    if (!end) return [start]
    return Array.from({ length: end - start + 1 }, (_, i) => i + start)
  })
}

/**
 * 解析元数据以提取起始行号
 * @param meta - 包含元数据的字符串
 * @returns 起始行号或 null
 */
function parseStartingLineNumber(meta: string): number | null {
  const match = /showLineNumbers\{(\d+)\}/.exec(meta)
  if (!match) return null
  if (match[1] === undefined) return null
  return parseInt(match[1], 10)
}

export interface TransformerDiffHighlightOptions {
  addClassName?: string
  removeClassName?: string
  highlightClassName?: string
}

const diffSymbol = Symbol('diff-lines')
const startLineSymbol = Symbol('start-line')

/**
 * Transformer to highlight lines in code blocks
 * @param options - Configuration options for the highlight transformer
 * @returns Transformer function
 */
export function transformerDiffHighlight(
  options: TransformerDiffHighlightOptions = {},
): ShikiTransformer {
  const {
    addClassName = 'diff add',
    removeClassName = 'diff remove',
    highlightClassName = 'diff highlight',
  } = options

  return {
    name: '@shikijs/transformers:diff-highlight',
    preprocess(code) {
      if (this.options.meta?.__raw) {
        const diffInfo = parseDiffString(this.options.meta.__raw)
        // eslint-disable-next-line security/detect-object-injection
        ;(this.meta as Record<symbol, DiffInfo>)[diffSymbol] = diffInfo

        const startingLineNumber = parseStartingLineNumber(
          this.options.meta.__raw,
        )
        // eslint-disable-next-line security/detect-object-injection
        ;(this.meta as Record<symbol, number | null>)[startLineSymbol] =
          startingLineNumber ?? 1
      }
      return code
    },
    line(node, line) {
      if (!this.options.meta?.__raw) {
        return node
      }
      // eslint-disable-next-line security/detect-object-injection
      const diffInfo = (this.meta as Record<symbol, DiffInfo>)[diffSymbol]
      // eslint-disable-next-line security/detect-object-injection
      const startLine = (this.meta as Record<symbol, number>)[startLineSymbol]
      if (!diffInfo || !startLine) {
        return node
      }
      const adjustedLine = line + startLine - 1

      if (diffInfo.add.includes(adjustedLine)) {
        this.addClassToHast(node, addClassName)
      }
      if (diffInfo.remove.includes(adjustedLine)) {
        this.addClassToHast(node, removeClassName)
      }
      if (diffInfo.highlight.includes(adjustedLine)) {
        this.addClassToHast(node, highlightClassName)
      }

      return node
    },
  }
}
