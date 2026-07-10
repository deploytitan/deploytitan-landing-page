import assert from 'node:assert/strict'
import test from 'node:test'

import { getRevalidationPaths } from './revalidation'

test('revalidates every public article surface', () => {
  assert.deepEqual(
    getRevalidationPaths({
      _id: 'article.example',
      _type: 'article',
      slug: { current: 'example' },
    }),
    ['/blog/example', '/blog', '/feed.xml', '/sitemap.xml'],
  )
})

test('revalidates article indexes when an article has no slug', () => {
  assert.deepEqual(
    getRevalidationPaths({ _id: 'article.incomplete', _type: 'article' }),
    ['/blog', '/feed.xml', '/sitemap.xml'],
  )
})

test('revalidates author surfaces without touching unrelated documents', () => {
  assert.deepEqual(
    getRevalidationPaths({ _id: 'author.example', _type: 'author' }),
    ['/about', '/blog'],
  )
  assert.deepEqual(
    getRevalidationPaths({ _id: 'asset.example', _type: 'distributionAsset' }),
    [],
  )
})
