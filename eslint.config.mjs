import { FlatCompat } from '@eslint/eslintrc';
import pluginQuery from '@tanstack/eslint-plugin-query';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    name: 'react-compiler/recommended',
    plugins: {
      'react-compiler': reactCompilerPlugin,
      'eslint-plugin-query': pluginQuery,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      '@tanstack/query/exhaustive-deps': 'error',
    },
    exclude: ['src/generated'],
  },
];

export default eslintConfig;
