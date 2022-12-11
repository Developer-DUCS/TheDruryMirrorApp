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
      default: "#F3F3F3"
    },
    primaryButton: {
      main:"#4685F5",
    },
  },
  typography:{
    splashHeader: {
      fontFamily: "Trajan",
      fontSize: "58px",
    },
    splashSubheader: {
      fontFamily: "Trajan",
      fontSize: "42px",
    },
    splashBody: {
      fontFamily: "AvantGarde",
      fontSize: "24px",
    },
    buttonLabel: {
      fontFamily: "BrownRegular",
      fontSize: "24px"
    },
    logo: {
      fontFamily: "Trajan",
      fontSize: "72px",
    },
    logoHeader: {
      fontFamily: "Trajan",
      fontSize: "28px",
    },
    userLabel: {
      fontFamily: "BrownRegular",
      fontSize: "22px",
    },
    copyEditorHeader: {
      fontFamily: "Trajan",
      fontSize: "24px",
    },
    copyEditorBody: {
      fontFamily: "AvantGarde",
      fontSize: "18px",
    },
    headline: {
      fontFamily: "AvantGarde",
      fontSize: "24px",
    },
    author: {
      fontFamily: "AvantGarde",
      fontSize: "18px",
    },
  }
});

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#fffee",
    },
    contrast:{
      main:"#000"
    },
    primaryButton: {
      main:"#4685F5",
    },
    background: {
      default: "#303030"
    },
  },
  typography:{
    aboutHeader: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: "36px",
    },
    aboutBody: {
      fontFamily: 'BrownRegular',
      fontSize: "24px"
    },
    aboutBold: {
      fontFamily: 'BrownBold',
      fontSize: "24px"
    },
    cardLabel: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: "18px",
    },
    cardBody: {
      fontFamily: 'BrownRegular',
      fontSize: "18px",
    },
    logoHeader: {
      fontFamily: "Trajan",
      fontSize: "28px",
    }
  }
});

export const aboutTheme = createTheme({
  palette: {
    primary: {
      main: "#fffee",
    },
    contrast:{
      main:"#000"
    },
    primaryButton: {
      main:"#4685F5",
    },
    background: {
      default: "#F3F3F3"
    },
  },
  typography:{
    aboutHeader: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: "32px",
    },
    aboutBody: {
      fontFamily: 'BrownRegular',
      fontSize: "20px"
    },
    aboutBold: {
      fontFamily: 'BrownBold',
      fontSize: "24px"
    },
    cardLabel: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: "18px",
    },
    cardBody: {
      fontFamily: 'BrownRegular',
      fontSize: "18px",
    },
    logoHeader: {
      fontFamily: "Trajan",
      fontSize: "28px",
    }
  }
});


theme.typography.h1 = {
  fontSize: '6rem',
  color: theme.palette.contrast.main,
  fontFamily: 'Garamond-Regular',
}
theme.typography.h2 = {
  fontSize: '2rem',
  color: "black",
  fontFamily: 'Garamond-Regular',
}
theme.typography.h3 = {
  fontSize: '1.25rem',
  color: "black",
  fontFamily: 'Garamond-Regular',
}
theme.typography.h5={
  fontSize: '1rem',
  color: "black",
  fontFamily: 'Garamond-Regular',
  fontWeight: 50,
}
theme.typography.paragraph={
  fontSize: '1rem',
  color: "black",
  fontFamily: 'Garamond-Regular',
  fontWeight: 30,
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
mainTheme.typography.h4 = {
  fontSize: '1.15rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
mainTheme.typography.h5={
  fontSize: '1rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
  fontWeight: 50,
}
mainTheme.typography.body1={
  fontSize: '1rem',
  color: "#000",
  fontFamily: 'AvantGarde',
  fontWeight: 60,
}
mainTheme.typography.body2={
  fontSize: '1.2rem',
  fontFamily: "AvantGarde",
  fontWeight: "bold",
}

aboutTheme.typography.h1 = {
  fontSize: '6rem',
  color: theme.palette.contrast.main,
  fontFamily: 'Garamond-Regular',
}
aboutTheme.typography.h2 = {
  fontSize: '2rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
aboutTheme.typography.h3 = {
  fontSize: '1.25rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
aboutTheme.typography.h4 = {
  fontSize: '1.15rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
}
aboutTheme.typography.h5={
  fontSize: '1rem',
  color: "#fff",
  fontFamily: 'Garamond-Regular',
  fontWeight: 50,
}
aboutTheme.typography.body1={
  fontSize: '1rem',
  color: "#000",
  fontFamily: 'AvantGarde',
  fontWeight: 60,
}
aboutTheme.typography.body2={
  fontSize: '1.2rem',
  fontFamily: "AvantGarde",
  fontWeight: "bold",
}