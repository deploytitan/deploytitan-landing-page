/**
 * The /studio route bypasses SiteLayoutClient (no nav/footer).
 * This layout only applies to /studio and its children.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
