/**
 * Format seconds into minutes:seconds format (MM:SS)
 * @param seconds Time in seconds
 * @returns Formatted time string
 */
export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00"

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}
