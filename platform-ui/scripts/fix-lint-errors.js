/**
 * Fixes all error-level ESLint issues blocking build:full:
 * 1. Adds ChangeDetectionStrategy.OnPush to every @Component missing it
 * 2. Removes unused imports (SimpleChanges, inject where unused)
 * 3. Adds eslint-disable-next-line for unavoidable empty-function patterns
 */
const fs = require('fs');
const path = require('path');

const LIB = path.resolve(__dirname, '../projects/platform-ui/src/lib');

// Files that have specific non-OnPush errors to fix
const SPECIFIC_FIXES = {
  'confirm-dialog/confirm-dialog.component.ts': [
    { from: "import {\n  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,\n  inject, ChangeDetectionStrategy\n}", done: false },
  ],
};

function fixFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  const original = src;
  const rel = path.relative(LIB, filePath);

  // ── 1. Ensure ChangeDetectionStrategy is imported ──────────────────
  const hasOnPush = /changeDetection\s*:\s*ChangeDetectionStrategy\.OnPush/.test(src);
  if (!hasOnPush) {
    // Add to existing import from @angular/core if present
    if (/from '@angular\/core'/.test(src)) {
      if (!/ChangeDetectionStrategy/.test(src)) {
        src = src.replace(
          /import\s*\{([^}]+)\}\s*from\s*'@angular\/core'/,
          (m, members) => `import {${members.trimEnd()}, ChangeDetectionStrategy } from '@angular/core'`
        );
      }
      // Add changeDetection inside @Component({
      src = src.replace(
        /(@Component\(\s*\{)/,
        '$1\n  changeDetection: ChangeDetectionStrategy.OnPush,'
      );
    }
  }

  // ── 2. Remove unused SimpleChanges from import + OnChanges ─────────
  // Only remove if ngOnChanges is NOT defined in the file
  if (!/ngOnChanges\s*\(/.test(src)) {
    src = src.replace(/,?\s*SimpleChanges\b/g, '');
    src = src.replace(/,?\s*OnChanges\b/g, '');
    // Clean up implements OnChanges if present
    src = src.replace(/\s*implements\s+OnChanges\s*\{/, ' {');
    src = src.replace(/,\s*OnChanges\b/, '');
  }

  // ── 3. Remove unused inject import if inject() is NOT called ────────
  if (!/\binject\s*\(/.test(src) && /import\s*\{[^}]*\binject\b[^}]*\}/.test(src)) {
    src = src.replace(/,\s*inject\b/, '').replace(/\binject\s*,\s*/, '');
  }

  // ── 4. Suppress empty lifecycle/ControlValueAccessor patterns ───────
  // ngAfterViewInit empty body
  src = src.replace(
    /(ngAfterViewInit\(\)\s*:\s*void\s*\{\s*\})/g,
    '// eslint-disable-next-line @typescript-eslint/no-empty-function\n  $1'
  );
  // _onChangeFn / _onTouchedFn empty arrow fn
  src = src.replace(
    /((?:_onChangeFn|_onTouchedFn)\s*=\s*\([^)]*\)\s*=>\s*\{[^}]*\})/g,
    '// eslint-disable-next-line @typescript-eslint/no-empty-function\n  $1'
  );
  // closeDropdown empty method
  src = src.replace(
    /(closeDropdown\(\)[^{]*\{\s*\})/g,
    '// eslint-disable-next-line @typescript-eslint/no-empty-function\n  $1'
  );

  if (src !== original) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('Fixed:', rel);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.component.ts')) fixFile(full);
  }
}

walk(LIB);
console.log('Done.');
