import { QuartzTransformerPlugin } from "../types"
import rehypePrettyCode, { Options as CodeOptions, Theme as CodeTheme } from "rehype-pretty-code"
import { Code, Root } from "mdast"
import { visit } from "unist-util-visit"

interface Theme extends Record<string, CodeTheme> {
  light: CodeTheme
  dark: CodeTheme
}

interface Options {
  theme?: Theme
  keepBackground?: boolean
}

const defaultOptions: Options = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
}

// Shiki language ids are lowercase and matched case-sensitively, but Obsidian accepts any case
// (```JS, ```TypeScript), so normalise fence languages before highlighting.
export function remarkLowercaseCodeLang() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code) => {
      if (node.lang) {
        node.lang = node.lang.toLowerCase()
      }
    })
  }
}

export const SyntaxHighlighting: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts: CodeOptions = { ...defaultOptions, ...userOpts }

  return {
    name: "SyntaxHighlighting",
    markdownPlugins() {
      return [remarkLowercaseCodeLang]
    },
    htmlPlugins() {
      return [[rehypePrettyCode, opts]]
    },
  }
}
