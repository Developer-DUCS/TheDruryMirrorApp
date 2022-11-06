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
      default: "#7A2529",
      primary: '#fff',
    },
    text: {
      color: '#fff',
    }
  },
});

theme.typography.h1 = {
  fontSize: '6rem',
  color: theme.palette.text.color,
  fontFamily: 'Garamond-Regular',
}
theme.typography.h2 = {
  fontSize: '2rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
theme.typography.h3 = {
  fontSize: '1.25rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
theme.typography.h5={
  fontSize: '1rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
  fontWeight: 50,
}

export default theme;