
// Original cn function was for class names.
// In React Native, styling is different. This function might not be directly applicable
// unless you adapt it for conditional style objects or a similar pattern.
// For now, keeping it as is, but it's unlikely to be used in the same way.

import { clsx, type ClassValue } from "clsx"
// twMerge is for Tailwind, not applicable here.
// import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // return twMerge(clsx(inputs))
  return clsx(inputs); // Without twMerge for React Native
}

// Example of how it *could* be used with style objects (less common)
// export function cnStyleObjects(...inputs: (StyleSheet | false | null | undefined)[]) {
//   return inputs.filter(Boolean).reduce((acc, style) => ({ ...acc, ...style }), {});
// }
