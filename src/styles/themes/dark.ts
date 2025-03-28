const breakpoints = {
  mobile: '767px', // Não precisa ser declarado (mobile-first)
  tablet: '768px',
  desktop: '1024px', // Valor ajustado
}

const darkTheme = {
  background: {
    primary: '#181C14',
    secondary: '#3C3D37',
    tertiary: '#697565',
  },
  projectBackground: {
    project1: '#2a2a2a', // EPlay - Cinza escuro inicial
    project2: '#FFB2B0', // EFood - Cinza um pouco mais claro
    project3: '#e87fe5', // Hoje Tá Doce - Rosa escuro com tom vibrante
    project4: '#4A2D29', // ToDo - Bege/marrom escuro
    project5: '#4A1A67', // Spider-Verse - Roxo profundo
    project6: '#2A396B', // Clone Disney - Azul escuro suave
  },
  color: {
    primary: '#fff',
    secondary: '#ECDFCC',
    tertiary: '#000',
  },
  shadow: {
    primary: 'rgba(42, 47, 36, 1)', // #2a2f24
    secondary: 'rgba(18, 21, 16, 1)', // #121510
    tertiary: 'rgba(32, 39, 30, 1)', // #20271e
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
    mobile: `(max-width: ${breakpoints.tablet})`, // <= 767px
    tablet: `(min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`, // 768px-1023px
    desktop: `(min-width: ${breakpoints.desktop})`, // >=1024px
  },
}

export default darkTheme
