import { ThemeProvider, createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    light: {
      main: '#0052cc',
    },
    dark: {
      main: '#edf2ff',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    background: {
      default: "#7A2529"
    },
    color: '#fff',
  },
});

theme.typography.h1 = {
  fontSize: '18',
  color: theme.palette.color,
  fontFamily: 'Garamond-Regular',
}

export default theme;