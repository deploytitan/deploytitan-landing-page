import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface AuthorBadgeProps {
  author: {
    name: string
    image?: object
    role?: string
    bio?: string
  }
  publishedAt?: string
  showBio?: boolean
}

export function AuthorBadge({ author, publishedAt, showBio }: AuthorBadgeProps) {
  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="flex items-start gap-3">
      {author.image && (
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-line">
          <Image
            src={urlFor(author.image as object).width(80).height(80).url()}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-ink">{author.name}</span>
        {author.role && (
          <span className="text-xs text-ink-tertiary">{author.role}</span>
        )}
        {date && (
          <span className="text-xs font-mono text-ink-quaternary">{date}</span>
        )}
        {showBio && author.bio && (
          <p className="text-sm text-ink-secondary mt-1 leading-relaxed">{author.bio}</p>
        )}
      </div>
    </div>
  )
}
