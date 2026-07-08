const { withNativeFederation } = require('@softarc/native-federation/build');

// ─── Why shared is empty ─────────────────────────────────────────────────────
// React and all its sub-packages (react/jsx-runtime, react-dom/client, etc.)
// are CommonJS modules. When NF bundles them as shared ESM chunks, esbuild
// wraps them with only a `default` export — so named imports like
//   import { jsx } from 'react/jsx-runtime'
// fail at runtime with "does not provide an export named 'jsx'".
//
// Solution: don't declare them as shared. esbuild will bundle them INLINE
// into Bootstrap.js where named access works natively.
// (If a second React remote is added later, revisit with the
//  @chialab/esbuild-plugin-commonjs plugin for proper CJS→ESM conversion.)
// ─────────────────────────────────────────────────────────────────────────────

module.exports = withNativeFederation({
  name: 'user-management',

  exposes: {
    './Bootstrap': './src/remote-entry/bootstrap.tsx',
  },

  shared: {},

  skip: [],
});
