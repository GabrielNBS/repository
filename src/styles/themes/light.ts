const breakpoints = {
  laptop: '1279px',
  tablet: '1023px',
  tabletVertical: '767px',
  mobile: '479px',
}

const lightTheme = {
  background: {
    primary: '#FFFBF5',
    secondary: '#F7EFE5',
    tertiary: '#C3ACD0',
  },
  projectBackground: {
    project1: '#e0e0e0', // EPlay - Branco acinzentado mais suave
    project2: '#d9d9d9', // EFood - Cinza claro com menos contraste
    project3: '#FFB3C6', // Hoje Tá Doce - Rosa pastel mais equilibrado
    project4: '#d1b8b0', // ToDo - Bege mais suave e levemente mais saturado
    project5: '#9A4FBF', // Spider-Verse - Roxo mais claro
    project6: '#b3b3d1', // Clone Disney - Azul acinzentado sutil
  },
  color: {
    primary: '#000',
    secondary: '#7743DB',
    tertiary: '0 ,0 ,0 , .8',
  },
  shadow: {
    primary: '0, 0, 0, 0.2',
    secondary: '0, 0, 0, 0.1',
    tertiary: '0, 0, 0, 0.4',
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
    bootstrap: '#b399cc',
  },
  breakpoints,
  device: {
    laptop: `(max-width: ${breakpoints.laptop})`,
    tablet: `(max-width: ${breakpoints.tablet})`,
    tabletVertical: `(max-width: ${breakpoints.tabletVertical})`,
    mobile: `(max-width: ${breakpoints.mobile})`,
  },
}

export default lightTheme
