import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

expect.addSnapshotSerializer({
  print(val) {
    return val.replace(/..\/macro/, 'svgr.macro');
  },
  test(val) {
    return typeof val === 'string';
  },
});

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
    parserOpts: { plugins: ['jsx'] },
  },
  tests: {
    logo: {
      error: false,
      code: `
        import toReactComponent from '../macro';

        const Logo = toReactComponent('./fixtures/logo.svg');
      `,
    },
    icon: {
      error: false,
      code: `
        import toReactComponent from '../macro';

        const Logo = toReactComponent('./fixtures/icon.svg', { icon: true });
      `,
    },
    replaceAttrValues: {
      error: false,
      code: `
        import toReactComponent from '../macro';

        const Logo = toReactComponent(
          './fixtures/icon.svg',
          { icon: true, replaceAttrValues: ['#61DAFB=currentColor'] },
        );
      `,
    },
    glob: {
      error: false,
      code: `
        import toReactComponent from '../macro';

        const { DoneBlack, Autorenew } = toReactComponent(
          './fixtures/material/*.svg',
          { icon: true },
        );
      `,
    },
    'it should only import react once': {
      error: false,
      code: `
        import * as React from 'react';
        import toReactComponent from '../macro';

        const Logo = toReactComponent('./fixtures/logo.svg');
      `,
    },
    'it should only import react once 2': {
      error: false,
      code: `
        import * as React from 'react';
        import toReactComponent from '../macro';

        const Logo = toReactComponent('./fixtures/logo.svg');
        const Icon = toReactComponent('./fixtures/icon.svg');
      `,
    },
    empty: {
      error: false,
      code: `
        import toReactComponent from '../macro';
      `,
    },
  },
});
