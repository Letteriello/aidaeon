/** @type {import('prettier').Config} */
module.exports = {
  // Configurações básicas
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  endOfLine: 'lf',

  // Configurações específicas para diferentes tipos de arquivo
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{yml,yaml}',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
    {
      files: '*.{ts,tsx,js,jsx}',
      options: {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'avoid',
      },
    },
  ],

  // Plugins
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  // Configurações do plugin de imports
  importOrder: [
    '^react$',
    '^next',
    '^@?\\w',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // Configurações do Tailwind CSS
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
};