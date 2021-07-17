import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
/*Reset do CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}  
body {
    font-family: sans-serif;
    background-image: url('https://i.picsum.photos/id/1028/1000/1000.jpg?hmac=fzXn63op6NzGPRPUW10Bk2tCkvSE2m51YaAPcAZvdTI');
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

${AlurakutStyles}
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
