// micromorph ships `index.d.ts` next to `index.mjs`, which TypeScript cannot pair up when it
// resolves through the package's "exports" map, so declare the one function used here.
declare module "micromorph" {
  export default function micromorph(from: Node, to: Node): Promise<void>
}
