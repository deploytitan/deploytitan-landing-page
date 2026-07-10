export type RevalidationDocument = {
  _id: string
  _type: string
  slug?: { current?: string }
}

export function getRevalidationPaths(document: RevalidationDocument) {
  if (document._type === 'article' || document._type === 'post') {
    return [
      ...(document.slug?.current ? [`/blog/${document.slug.current}`] : []),
      '/blog',
      '/feed.xml',
      '/sitemap.xml',
    ]
  }

  if (document._type === 'author') {
    return ['/about', '/blog']
  }

  return []
}
