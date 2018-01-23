// @flow
import path from 'path';
import type { Option } from './optionToCLI';

export default function getArguments(
  referencePath: Object,
  filename: string,
): [string, Option] {
  const [srcReferencePath, optionReferencePath] = referencePath.parentPath.get(
    'arguments',
  );
  const svgPath = path.resolve(
    path.dirname(filename),
    srcReferencePath.node.value,
  );
  const option = optionReferencePath
    ? optionReferencePath
        .get('properties')
        .reduce((acc, propertyReferencePath) => {
          const { container } = propertyReferencePath.get('ObjectProperty');
          const value =
            container.value.type === 'ArrayExpression'
              ? container.value.elements.map(v => v.value)
              : container.value.value;
          return {
            ...acc,
            [container.key.name]: value,
          };
        }, {})
    : {};

  return [svgPath, option];
}
