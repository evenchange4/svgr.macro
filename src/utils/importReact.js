// @flow
import type { BabelPluginPass, Types } from 'babel-flow-types';

export default function importReact(state: BabelPluginPass, t: Types): void {
  const fileBodyReference =
    (state.file.path.node && state.file.path.node.body) || [];
  const reactImportDeclaration = fileBodyReference
    .filter(node => t.isImportDeclaration(node))
    .find(e => e.source.value === 'react');
  const isReactImported = Boolean(reactImportDeclaration);

  if (!isReactImported) {
    fileBodyReference.unshift(
      t.importDeclaration(
        [t.importNamespaceSpecifier(t.identifier('React'))],
        t.stringLiteral('react'),
      ),
    );
  }
}
