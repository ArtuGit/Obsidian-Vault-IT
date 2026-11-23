import test, { describe } from "node:test"
import assert from "node:assert"
import { unified } from "unified"
import remarkParse from "remark-parse"
import { Code, Root } from "mdast"
import { visit } from "unist-util-visit"
import { remarkLowercaseCodeLang } from "./syntax"

function fenceLangs(markdown: string): (string | null | undefined)[] {
  const processor = unified().use(remarkParse).use(remarkLowercaseCodeLang)
  const tree = processor.runSync(processor.parse(markdown)) as Root
  const langs: (string | null | undefined)[] = []
  visit(tree, "code", (node: Code) => {
    langs.push(node.lang)
  })
  return langs
}

describe("remarkLowercaseCodeLang", () => {
  test("lowercases fence languages so Shiki recognises them", () => {
    assert.deepStrictEqual(fenceLangs("```JS\na\n```\n\n```TypeScript\nb\n```"), [
      "js",
      "typescript",
    ])
  })

  test("leaves lowercase languages and fences without a language alone", () => {
    assert.deepStrictEqual(fenceLangs("```javascript\na\n```\n\n```\nb\n```"), ["javascript", null])
  })

  test("keeps fence meta untouched", () => {
    const processor = unified().use(remarkParse).use(remarkLowercaseCodeLang)
    const tree = processor.runSync(processor.parse('```JS title="Main.js"\na\n```')) as Root
    const node = tree.children[0] as Code
    assert.strictEqual(node.lang, "js")
    assert.strictEqual(node.meta, 'title="Main.js"')
  })
})
