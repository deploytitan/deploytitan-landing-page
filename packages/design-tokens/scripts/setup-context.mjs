#!/usr/bin/env node
// packages/design-tokens/scripts/setup-context.mjs
//
// Creates PRODUCT.md and DESIGN.md symlinks at the root of any repo that
// depends on @deploytitan/design-tokens.
//
// Usage (run from any repo root):
//   node node_modules/@deploytitan/design-tokens/scripts/setup-context.mjs
//
// Or add to your package.json postinstall:
//   "postinstall": "node node_modules/@deploytitan/design-tokens/scripts/setup-context.mjs"

import { symlinkSync, existsSync, lstatSync, unlinkSync, realpathSync } from 'fs'
import { resolve, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(__dirname, '..')
const repoRoot = process.cwd()

const files = ['PRODUCT.md', 'DESIGN.md']

for (const file of files) {
  const target = resolve(packageDir, file)
  const link   = resolve(repoRoot, file)
  const rel    = relative(repoRoot, target)

  if (existsSync(link)) {
    const stat = lstatSync(link)
    if (stat.isSymbolicLink()) {
      const current = realpathSync(link)
      if (current === target) {
        console.log(`  ok  ${file} (already linked)`)
        continue
      }
      unlinkSync(link)
    } else {
      // Real file — don't clobber it, just warn
      console.warn(`  !!  ${file} exists as a real file, skipping. Remove it manually to use the symlink.`)
      continue
    }
  }

  symlinkSync(rel, link)
  console.log(`  →   ${file} → ${rel}`)
}
