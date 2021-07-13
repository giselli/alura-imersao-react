import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
/*Reset do CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}  
body {
    font-family: sans-serif;
    background-color: #D9e6f6;
  }

#_next{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

img{
  max-width: 100%;
  height: auto;
  display: block;  
}
`

const theme = {
  colors: {
    primary: 'green',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
