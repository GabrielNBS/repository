const breakpoints = {
  mobile: '767px',
  tablet: '768px',
  desktop: '1023px'
};

const lightTheme = {
  background: {
    primary: '#FFFBF5',
    secondary: '#F7EFE5'
  },
  color: {
    primary: '#000',
    secondary: '#7743DB',
    tertiary: '#fff'
  },
  shadow: {
    primary: 'rgba(190, 190, 190, 0.6)',
    secondary: 'rgba(255, 255, 255, 0.8);',
    tertiary: 'rgba(121, 121, 121, 0.2)'
  },
  stackColor: {
    react: '#99d6ff',
    javascript: '#ffe680',
    typescript: '#99ccff',
    redux: '#c299ff',
    styled: '#ff99b3',
    sass: '#ff99aa',
    html: '#ff9966',
    css: '#99b3ff',
    cypress: '#808080',
    bootstrap: '#b399cc'
  },
  breakpoints,
  device: {
    mobile: `(max-width: ${breakpoints.tablet})`,
    tablet: `(min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
    desktop: `(min-width: ${breakpoints.desktop})`
  }
};

export default lightTheme;
