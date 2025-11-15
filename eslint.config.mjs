import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          checkNestedExternalImports: false,
          depConstraints: [
            // Apps can depend on anything
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['*'],
            },
            // Features can depend on ui, util, models, data-access, and other features within the same scope
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:util',
                'type:models',
                'type:data-access',
              ],
            },
            // UI libs can depend only on util, models, and other ui in scope:shared
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:util', 'type:models'],
            },
            // Data-access can depend on util, models in shared, and data-access in the same domain
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:util',
                'type:models',
              ],
            },
            // Util libs can depend only on other util and models
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util', 'type:models'],
            },
            // Models are at the bottom - can only depend on other models
            {
              sourceTag: 'type:models',
              onlyDependOnLibsWithTags: ['type:models'],
            },
            // Scope enforcement: shared scope can be used by all
            // Note: This rule only constrains what shared can depend on, not what can depend on shared
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // public-web scope can depend on shared
            {
              sourceTag: 'scope:public-web',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:public-web'],
            },
            // admin-portal scope can depend on shared and identity
            {
              sourceTag: 'scope:admin-portal',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'scope:identity',
                'scope:admin-portal',
              ],
            },
            // identity scope can depend on shared
            {
              sourceTag: 'scope:identity',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:identity'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
