// @ts-check
const tseslint = require('typescript-eslint');
const angular  = require('angular-eslint');

module.exports = tseslint.config(

  // ── 1. Ignore generated / dist output ───────────────────────────────────
  { ignores: ['dist/**', '.angular/**', 'node_modules/**', '**/*.spec.ts'] },

  // ── 2. TypeScript source files ──────────────────────────────────────────
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'projects/*/tsconfig*.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {

      // ── Angular rules ────────────────────────────────────────────────
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'pui', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'pui-lib', style: 'kebab-case' },
      ],
      // Docs app components use 'docs' prefix — exempt them
      // (overridden per-project below)

      '@angular-eslint/no-empty-lifecycle-method':    'error',
      '@angular-eslint/use-lifecycle-interface':      'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/no-input-rename':              'error',
      '@angular-eslint/no-output-rename':             'error',
      '@angular-eslint/no-output-on-prefix':          'error',
      '@angular-eslint/relative-url-prefix':          'error',
      '@angular-eslint/component-class-suffix':       'error',
      '@angular-eslint/directive-class-suffix':       'error',

      // ── TypeScript rules ─────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any':           'warn',
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-non-null-assertion':     'warn',
      // ControlValueAccessor onChange/onTouched/onValidatorChange fields are
      // idiomatically initialized as no-op arrow functions, overwritten by
      // registerOnChange/registerOnTouched at runtime.
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      // Migrate constructor injection → inject() as a separate dedicated task
      '@angular-eslint/prefer-inject':               'off',
      // Enable as a future clean-up pass; too noisy to enforce now
      '@typescript-eslint/consistent-type-imports':  'off',

      // ── General JS/TS ────────────────────────────────────────────────
      'no-console':   ['warn', { allow: ['warn', 'error'] }],
      // 'smart' still forbids == everywhere except x == null (catches both
      // null and undefined in one check) and typeof comparisons.
      'eqeqeq':       ['error', 'smart'],
      'no-debugger':  'error',
    },
  },

  // ── 3. HTML templates ───────────────────────────────────────────────────
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
    ],
    rules: {
      '@angular-eslint/template/no-negated-async':      'error',
      '@angular-eslint/template/no-any':               'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/alt-text':             'error',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus':   'warn',

      // Migrate *ngIf/*ngFor → @if/@for as a separate dedicated task
      '@angular-eslint/template/prefer-control-flow': 'off',

      // Relax overly noisy rules
      '@angular-eslint/template/i18n':                'off',
    },
  },

  // ── 4. Docs app overrides (relaxed selector prefix) ─────────────────────
  {
    files: ['projects/docs/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'docs', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'docs', style: 'camelCase' },
      ],
      // Docs pages intentionally use ChangeDetectionStrategy.Default in some places
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
);
