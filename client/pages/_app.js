import { GlobalContextProvider } from '../src/context/GlobalContext'
import '../styles/globals.css'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    "fontFamily": `"Poppins", sans-serif`,
    color: "black"
  }
});


function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
