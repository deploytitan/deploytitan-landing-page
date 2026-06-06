import { defineQuery } from 'next-sanity'

// ─── Post list (listing page) ─────────────────────────────────────────────────
export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage { asset, alt, hotspot, crop },
    "author": author->{ name, image, role },
    "categories": categories[]->{ title, slug },
  }
`)

// ─── Single post (detail page) ────────────────────────────────────────────────
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage { asset, alt, hotspot, crop },
    "author": author->{ name, image, role, bio },
    "categories": categories[]->{ title, slug },
    body,
  }
`)

// ─── All slugs (for generateStaticParams) ────────────────────────────────────
export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`)

// ─── All categories (for nav strip + generateStaticParams) ───────────────────
export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
  }
`)

// ─── Single category by slug ──────────────────────────────────────────────────
export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "postCount": count(*[_type == "post" && defined(slug.current) && references(^._id)]),
  }
`)

// ─── Posts filtered by category slug ─────────────────────────────────────────
export const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && $categorySlug in categories[]->slug.current]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage { asset, alt, hotspot, crop },
    "author": author->{ name, image, role },
    "categories": categories[]->{ title, slug },
  }
`)
