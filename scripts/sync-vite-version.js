import { createRequire } from 'module'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'path'


const require = createRequire(import.meta.url)
const vPkg = require('vitepress/package.json')
const viteVersion = vPkg.dependencies?.vite || vPkg.devDependencies?.vite

if (!viteVersion) {
  process.exit(1)
}

const pkgPath = resolve(process.cwd(), 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

pkg.peerDependencies = pkg.peerDependencies || {}
pkg.peerDependencies.vite = viteVersion

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
console.log(`✅ Synced vite version to ${ viteVersion }`)
