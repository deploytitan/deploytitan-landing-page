import { client, writeClient } from '../src/sanity/lib/client'

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN')
  }

  const posts = await client.fetch<
    Array<{
      _id: string
      _type: 'post'
      _createdAt: string
      _updatedAt: string
      title: string
      slug?: { current?: string }
      excerpt?: string
      publishedAt?: string
      coverImage?: object
      author?: { _ref: string }
      categories?: Array<{ _ref: string }>
      body?: unknown[]
    }>
  >(`*[_type == "post"]`)

  for (const post of posts) {
    const articleId = post._id.replace(/^drafts\./, '').replace(/^post\./, 'article-')

    await writeClient.createOrReplace({
      _id: articleId,
      _type: 'article',
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      directAnswer: post.excerpt || `Answer this question directly in the article intro for ${post.title}.`,
      primaryQuestion: post.title,
      publishedAt: post.publishedAt ?? post._createdAt,
      author: post.author ? { _type: 'reference', _ref: post.author._ref } : undefined,
      categories: post.categories?.map((category) => ({ _type: 'reference', _ref: category._ref })),
      coverImage: post.coverImage,
      body: post.body,
      status: 'published',
      legacyPostId: post._id,
    })

    console.log(`Migrated ${post._id} -> ${articleId}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
