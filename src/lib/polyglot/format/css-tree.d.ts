/** The package's official browser bundle exposes the same typed API without a CommonJS source-map import. */
declare module 'css-tree/dist/csstree.esm' {
  export {generate, parse, walk} from 'css-tree';
}
