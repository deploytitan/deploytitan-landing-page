/**
 * vite-plugin-link-graph.ts
 *
 * Scans src/pages/**\/*.tsx for:
 *   - <Link to="...">  / <Link to={`...`}>  (static strings / template literals with no expressions)
 *   - href="/..."      (internal anchors)
 *   - Route definitions in App.tsx  (path="..." / path={...})
 *
 * Emits src/data/siteGraph.generated.ts with GraphNode[] and GraphLink[].
 * Re-runs on every file change in dev mode.
 */

import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

export interface GraphNode {
  id: string       // route path e.g. "/products/titan-rollout"
  label: string    // human label e.g. "Titan Rollout"
  file: string     // source file relative to src/
}

export interface GraphLink {
  source: string
  target: string
  kind: 'nav' | 'link' | 'href'
}

function routeToLabel(route: string): string {
  if (route === '/') return 'Home'
  return route
    .split('/')
    .filter(Boolean)
    .map((s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(' › ')
}

function extractLinksFromFile(_filePath: string, content: string): string[] {
  const links: string[] = []

  // <Link to="/foo"> or <Link to={"/foo"}> or <Link to={`/foo`}>
  const linkTo = /\bto=["'`{](["`']?)(\/[^"'`\s)}]+)\1["'`}]/g
  let m: RegExpExecArray | null
  while ((m = linkTo.exec(content)) !== null) {
    links.push(m[2])
  }

  // href="/foo"
  const hrefRe = /href=["'](\/[^"']+)["']/g
  while ((m = hrefRe.exec(content)) !== null) {
    if (!m[1].startsWith('//') && !m[1].includes('mailto')) {
      links.push(m[1])
    }
  }

  // Strip query/hash
  return [...new Set(links.map((l) => l.split('?')[0].split('#')[0]).filter(Boolean))]
}

function extractRoutesFromApp(content: string): string[] {
  const routes: string[] = []
  // path="/foo" or path={"/foo"}
  const pathRe = /\bpath=["'{`](["`']?)(\/[^"'`\s)}*]+)\1["'`}]/g
  let m: RegExpExecArray | null
  while ((m = pathRe.exec(content)) !== null) {
    if (m[2] !== '*') routes.push(m[2])
  }
  return [...new Set(routes)]
}

/**
 * Build a mapping from normalised file stem → route id.
 * e.g. "pages/CLI.tsx" → "/cli", "pages/products/TitanShield.tsx" → "/products/titan-shield"
 * We do this by comparing the lowercased, stripped file stem against the lowercased route.
 */
function buildFileToRouteMap(routes: string[], pagesDir: string, files: string[]): Map<string, string> {
  const map = new Map<string, string>()

  for (const file of files) {
    // Compute a normalised key from the file path: strip pagesDir prefix + .tsx, lowercase
    const rel = path.relative(pagesDir, file).replace(/\.tsx$/, '')
    // e.g. "CLI" → "cli", "products/TitanShield" → "products/titanshield"
    const fileKey = rel.toLowerCase().replace(/\/index$/, '')

    // Find the best matching route: strip leading slash + lowercase, compare without hyphens
    let bestRoute: string | undefined
    let bestScore = -1
    for (const route of routes) {
      // Normalise route to comparable form: remove leading slash, lowercase, strip hyphens
      const routeKey = route.slice(1).toLowerCase().replace(/-/g, '')
      const fileKeyNoDash = fileKey.replace(/-/g, '')
      if (routeKey === fileKeyNoDash) {
        // Exact match (modulo hyphens) — highest priority
        bestRoute = route
        bestScore = 2
        break
      }
      // Fallback: route ends with the same basename
      const routeBase = routeKey.split('/').pop() ?? ''
      const fileBase = fileKeyNoDash.split('/').pop() ?? ''
      if (routeBase === fileBase && bestScore < 1) {
        bestRoute = route
        bestScore = 1
      }
    }

    if (bestRoute) {
      map.set(file, bestRoute)
    }
  }

  return map
}

async function buildGraph(srcDir: string): Promise<{ nodes: GraphNode[]; links: GraphLink[] }> {
  const pagesDir = path.join(srcDir, 'pages')
  const appFile = path.join(srcDir, 'App.tsx')

  const nodes = new Map<string, GraphNode>()
  const linkSet = new Set<string>()
  const links: GraphLink[] = []

  // 1. Collect all routes from App.tsx
  let allRoutes: string[] = []
  if (fs.existsSync(appFile)) {
    const appContent = fs.readFileSync(appFile, 'utf-8')
    allRoutes = extractRoutesFromApp(appContent)
    for (const route of allRoutes) {
      if (!nodes.has(route)) {
        nodes.set(route, { id: route, label: routeToLabel(route), file: 'App.tsx' })
      }
    }
  }

  // 2. Scan all page files for outgoing links
  const files = await glob('**/*.tsx', { cwd: pagesDir, absolute: true })

  // Build reliable file→route mapping using App.tsx routes as ground truth
  const fileToRoute = buildFileToRouteMap(allRoutes, pagesDir, files)

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8')
    const relFile = path.relative(srcDir, file)

    // Resolve this file's route — skip if we can't match it to a known route
    const sourceId = fileToRoute.get(file)
    if (!sourceId) continue

    const outLinks = extractLinksFromFile(file, content)
    for (const target of outLinks) {
      // Ensure target node exists (it should already from App.tsx scan)
      if (!nodes.has(target)) {
        nodes.set(target, { id: target, label: routeToLabel(target), file: relFile })
      }

      const key = `${sourceId}→${target}`
      if (sourceId !== target && nodes.has(target) && !linkSet.has(key)) {
        linkSet.add(key)
        links.push({ source: sourceId, target, kind: 'link' })
      }
    }
  }

  return { nodes: [...nodes.values()], links }
}

function serializeGraph(nodes: GraphNode[], links: GraphLink[]): string {
  return `// AUTO-GENERATED by vite-plugin-link-graph — do not edit manually
// Re-generated on every dev-server start and build

export interface GraphNode {
  id: string
  label: string
  file: string
}

export interface GraphLink {
  source: string
  target: string
  kind: 'nav' | 'link' | 'href'
}

export const generatedNodes: GraphNode[] = ${JSON.stringify(nodes, null, 2)}

export const generatedLinks: GraphLink[] = ${JSON.stringify(links, null, 2)}
`
}

export function linkGraphPlugin(): Plugin {
  let srcDir: string

  async function generate(root: string) {
    srcDir = path.join(root, 'src')
    const outFile = path.join(srcDir, 'data', 'siteGraph.generated.ts')

    // Ensure data dir exists
    const dataDir = path.dirname(outFile)
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

    const { nodes, links } = await buildGraph(srcDir)
    fs.writeFileSync(outFile, serializeGraph(nodes, links), 'utf-8')
    console.log(`[link-graph] ${nodes.length} nodes, ${links.length} links → src/data/siteGraph.generated.ts`)
  }

  return {
    name: 'vite-plugin-link-graph',

    async buildStart() {
      // @ts-ignore
      await generate(this.meta?.watchMode ? process.cwd() : process.cwd())
    },

    configResolved(config) {
      srcDir = path.join(config.root, 'src')
    },

    async handleHotUpdate({ file, server }) {
      if (file.endsWith('.tsx') && file.includes('/src/')) {
        await generate(server.config.root)
        // Invalidate the generated file so HMR picks it up
        const mod = server.moduleGraph.getModuleById(
          path.join(server.config.root, 'src', 'data', 'siteGraph.generated.ts')
        )
        if (mod) server.moduleGraph.invalidateModule(mod)
      }
    },
  }
}
