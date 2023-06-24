import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import App from './App.tsx'
import './styles/normalize.css'
import './styles/style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
