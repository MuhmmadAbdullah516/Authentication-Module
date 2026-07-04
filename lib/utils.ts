// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Combine multiple CSS class names into one string
 * Removes empty/false values automatically
 */
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
