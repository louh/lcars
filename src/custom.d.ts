// Handle types for all SVG files
// https://webpack.js.org/guides/typescript/#importing-other-assets
// https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
