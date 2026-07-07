import { SanityLive } from '@/sanity/lib/live'
import { VisualEditing } from 'next-sanity/visual-editing'
import { DisableDraftMode } from './DisableDraftMode'

export function DraftModeControls() {
  return (
    <>
      <SanityLive />
      <VisualEditing />
      <DisableDraftMode />
    </>
  )
}
