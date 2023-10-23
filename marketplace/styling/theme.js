// styling/theme.js

const theme = {
  colors: {
    primary: '#4CAF50',   // A shade of light green for primary actions and highlights
    secondary: '#A5D6A7', // A softer shade of green for secondary actions and backgrounds
    background: '#E8F5E9', // Very light green background for general sections
    textPrimary: '#2E7D32',  // Dark green for primary text against light backgrounds
    textSecondary: '#78909C', // Grayish color for secondary or less important text
    error: '#D32F2F',    // A standard error color, if needed.
    white: '#FFFFFF',    // White color, can be used for cards or modal backgrounds.
    black: '#000000',    // Black color, mainly for text.
  },

  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },

  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },

  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};

// Define styles outside of the theme object to avoid reference errors
const styles = {
  input: {
    height: 40,
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.medium,
  },
  picker: {
    height: 50,
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.white,
    color: theme.colors.textPrimary,
  },
  pickerItem: {
    height: 50,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.medium,
  },
};

// Assign the styles object to theme
theme.styles = styles;

export default theme;
