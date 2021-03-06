// @flow
import fs from 'fs';
import { execSync } from 'child_process';
import { createMacro } from 'babel-plugin-macros';
import { parse } from 'babylon';
import glob from 'glob';
import type { Babel, BabelPluginPass } from 'babel-flow-types';
import importReact from './utils/importReact';
import getArguments from './utils/getArguments';
import optionToCLI from './utils/optionToCLI';
// import printAST from 'ast-pretty-print';
// console.log(printAST(referencePath.parentPath));

function svgrMacro({
  references,
  state,
  state: { file: { opts: { filename } } },
  babel: { types: t },
}: {
  references: { default: Array<any> },
  state: BabelPluginPass,
  babel: Babel,
}): void {
  const { default: toReactComponent = [] } = references;

  // Node: add react on the top of file if it have not been imported.
  importReact(state, t);

  toReactComponent.forEach(referencePath => {
    const [svgPath, options] = getArguments(referencePath, filename);
    const cliArguments = optionToCLI(options);
    const isFileExists = fs.existsSync(svgPath);

    if (isFileExists) {
      // Case 1: single file
      const jsCode = execSync(`svgr "${svgPath}" ${cliArguments}`).toString();
      const ast = parse(jsCode, { sourceType: 'module', plugins: ['jsx'] });
      const arrowFunctionExpression = ast.program.body[1].declarations[0].init;

      referencePath.parentPath.replaceWith(arrowFunctionExpression);
    } else {
      // Case 2: glob pattern
      const objectProperties = glob.sync(svgPath).map(f => {
        // TODO: merge multiple files and run svgr at same time.
        const jsCode = execSync(`svgr "${f}" ${cliArguments}`).toString();
        const ast = parse(jsCode, { sourceType: 'module', plugins: ['jsx'] });
        const componentName = ast.program.body[1].declarations[0].id.name;
        const arrowFunctionExpression =
          ast.program.body[1].declarations[0].init;
        return t.objectProperty(
          t.stringLiteral(componentName),
          arrowFunctionExpression,
        );
      });

      referencePath.parentPath.replaceWith(
        t.objectExpression(objectProperties),
      );
    }
  });
}

export default createMacro(svgrMacro);
