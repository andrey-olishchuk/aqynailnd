
// This script ensures that CSS variables from theme.json are properly loaded
import theme from '../../../theme.json';

export function loadThemeVariables() {
  // Get the theme variant, primary color, and radius from theme.json
  const { variant, primary, radius } = theme;
  const isDarkMode = variant === 'professional' || variant === 'dark';
  
  // For debugging theme loading
  console.log('Loading theme:', { variant, primary, radius, isDarkMode });
  
  // Ensure the document has the dark class if in dark mode
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  }
  
  // Set CSS variable for primary color if needed
  if (primary && primary !== 'hsl(24, 95%, 45%)') {
    // Convert HSL string to HSL components for CSS variables
    const hslMatch = primary.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
      const [, h, s, l] = hslMatch;
      document.documentElement.style.setProperty('--primary', `${h} ${s}% ${l}%`);
    }
  }
  
  // Set border radius if needed
  if (radius !== undefined) {
    document.documentElement.style.setProperty('--radius', `${radius}rem`);
  }
}
