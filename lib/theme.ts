export const theme = {
  colors: {
    // Primary brand colors
    primary: '#514437',
    background: '#F5EFE1',
    
    // Semantic colors
    text: '#514437',
    textMuted: '#514437',
    border: '#514437',
    
    // Component-specific colors
    header: {
      background: '#F5EFE1',
      text: '#514437',
      logo: '#514437',
    },
    
    footer: {
      background: '#F5EFE1',
      text: '#514437',
      border: '#514437',
    },
    
    // Button colors
    button: {
      primary: '#514437',
      text: '#FFFFFF',
    },
    
    // Decorative elements
    decorative: '#514437',
  },
  
  // Opacity values
  opacity: {
    light: 0.7,
    medium: 0.5,
    heavy: 0.1,
  },
  
  // Breakpoints (if needed)
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
} as const;

// Type exports for TypeScript
export type ThemeColors = typeof theme.colors;
export type Theme = typeof theme;