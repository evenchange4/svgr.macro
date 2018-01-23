// @flow
export type Option = {
  svgo?: boolean,
  prettier?: boolean,
  expandProps?: boolean,
  icon?: boolean,
  native?: boolean,
  viewBox?: boolean,
  ids?: boolean,
  ref?: boolean,
  replaceAttrValues?: Array<string>,
  precision?: number,
  keepUselessDefs?: boolean,
  title?: boolean,
};

export default function optionToCLI({
  svgo = true,
  prettier = false, // Note: default to true in svgr
  expandProps = true,
  icon = false,
  native = false,
  viewBox = true,
  ids = false,
  ref = false,
  replaceAttrValues = [],
  precision = 3,
  keepUselessDefs = false,
  title = true,
}: Option) {
  return [
    svgo ? '' : '--no-svgo',
    prettier ? '' : '--no-prettier',
    expandProps ? '' : '--no-expand-props',
    icon ? '--icon' : '',
    native ? '--native' : '',
    viewBox ? '' : '--no-view-box',
    ids ? '--ids' : '',
    ref ? '--ref' : '',
    ...replaceAttrValues.map(v => `--replace-attr-value '${v}'`),
    `--precision ${precision}`,
    keepUselessDefs ? '--keep-useless-defs' : '',
    title ? '' : '--no-title',
  ]
    .filter(e => !!e)
    .join(' ');
}
