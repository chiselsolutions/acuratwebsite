/** Tiny className joiner — filters out false/null/undefined branches. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
