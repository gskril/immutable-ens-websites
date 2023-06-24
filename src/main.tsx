import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'

import App from './App.tsx'
import { chains, wagmiConfig } from './providers.ts'
import './styles/normalize.css'
import './styles/style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  </React.StrictMode>
)
