const breakpoints = {
  mobile: '767px', // Não precisa ser declarado (mobile-first)
  tablet: '768px',
  desktop: '1023px', // Valor ajustado
}

const darkTheme = {
  background: {
    primary: '#191716',
    secondary: '#156064',
  },
  color: {
    primary: '#fff',
    secondary: '#00c49a',
    tertiary: '#000',
  },
  shadow: {
    primary: 'rgba(0, 0, 0, 0.8)',
    secondary: 'rgba(5, 5, 5, 0.6)',
    tertiary: 'rgba(10, 10, 10, 0.4)',
  },
  stackColor: {
    react: '#002244',
    javascript: '#554400',
    typescript: '#002266',
    redux: '#3d0077',
    styled: '#77233d',
    sass: '#77233d',
    html: '#772200',
    css: '#002266',
    cypress: '#3d3d3d',
    bootstrap: '#3d2355',
  },
  breakpoints,
  device: {
    mobile: `(max-width: ${breakpoints.tablet})`,
    tablet: `(min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
    desktop: `(min-width: ${breakpoints.desktop})`,
  },
}

export default darkTheme
