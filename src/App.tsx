import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Layout } from './components/atoms'

export default function App() {
  // Step 0: User is not connected
  // Step 1: User has connected wallet
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) setStep(1)
  }, [isConnected])

  return (
    <>
      <Layout>
        <Nav />

        <main>
          {step === 0 && <Hero />}

          {step === 1 && <p>connected</p>}
        </main>

        {/* Footer placeholder */}
        <div style={{ height: '3rem' }} />
      </Layout>
    </>
  )
}
