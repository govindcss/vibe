
import React, { createContext, useContext, useState } from 'react';
import VibeWaveColors, { defaultRadius } from '../theme';

interface Theme {
  colors: typeof VibeWaveColors;
  radius: number;
  // Add other theme properties like typography if needed
}

interface ThemeContextType {
  theme: Theme;
  // toggleTheme?: () => void; // If theme switching is needed later
}

const defaultTheme: Theme = {
  colors: VibeWaveColors,
  radius: defaultRadius,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // For now, only one theme (dark). Could be expanded later.
  const [theme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
