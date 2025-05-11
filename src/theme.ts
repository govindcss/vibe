
// Extracted and adapted from globals.css HSL values
// For React Native, we'll use hex or rgba strings.
// HSL to RGB/HEX conversion is needed. For simplicity, I'll use approximate hex values
// or keep HSL strings if a library supports them (most core RN styles don't directly).
// For now, using placeholder hex values that represent the VibeWave style.

const VibeWaveColors = {
  background: '#1C1F2E', // Dark Blue/Gray ~hsl(222, 47%, 11%)
  foreground: '#F0F4F8', // Light Gray ~hsl(210, 40%, 98%)

  card: '#23273A', // Slightly Lighter Dark Blue/Gray ~hsl(222, 47%, 14%)
  cardForeground: '#F0F4F8',

  popover: '#1C1F2E',
  popoverForeground: '#F0F4F8',

  primary: '#E6399B', // Hot Pink ~hsl(320, 85%, 55%)
  primaryForeground: '#FFFFFF',

  secondary: '#3B82F6', // Electric Blue ~hsl(210, 90%, 55%)
  secondaryForeground: '#FFFFFF',

  muted: '#303650', // Muted version of background ~hsl(222, 47%, 20%)
  mutedForeground: '#8A94A6', // Muted foreground ~hsl(210, 40%, 60%)

  accent: '#7C3AED', // Purple ~hsl(260, 85%, 60%)
  accentForeground: '#FFFFFF',

  destructive: '#EF4444', // Red ~hsl(0, 70%, 55%)
  destructiveForeground: '#FFFFFF',

  border: '#404866', // Darker border ~hsl(222, 47%, 25%)
  input: '#2C3146', // Input background ~hsl(222, 47%, 18%)
  ring: '#3B82F6', // Electric Blue for ring

  // Chart colors (can be used as is if charting library supports hex)
  chart1: '#E6399B', // primary
  chart2: '#3B82F6', // secondary
  chart3: '#7C3AED', // accent
  chart4: '#F97316', // Orange ~hsl(30, 80%, 60%)
  chart5: '#22C55E', // Green ~hsl(120, 70%, 50%)

  // Additional for gradients or specific elements
  gradientVia: '#7C3AED', // accent
};

export const defaultRadius = 12; // 0.75rem ~ 12px

export default VibeWaveColors;
