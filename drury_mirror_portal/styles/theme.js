import { ThemeProvider, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#fffee",
    },
    contrast:{
      main:"#fff"
    },
    background: {
      default: "#781f1c"
    }
  },
});

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#fffee",
    },
    contrast:{
      main:"#000"
    },
    background: {
      default: "#0E0E0E"
    },
  },
});

let lightTheme = createTheme({
  palette: {
    light: {
      main: '#0052cc',
    },
    dark: {
      main: '#edf2ff',
    },
  },
});


theme.typography.h1 = {
  fontSize: '6rem',
  color: theme.palette.contrast.main,
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



mainTheme.typography.h1 = {
  fontSize: '6rem',
  color: theme.palette.contrast.main,
  fontFamily: 'Garamond-Regular',
}
mainTheme.typography.h2 = {
  fontSize: '2rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
mainTheme.typography.h3 = {
  fontSize: '1.25rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
mainTheme.typography.h5={
  fontSize: '1rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
  fontWeight: 50,
}