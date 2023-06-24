import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { Nav } from './components/Nav'
import { Steps } from './components/Steps'
import { Layout } from './components/atoms'
import { Hero, WrapParent } from './components/screens'

const possibleSteps = [0, 1, 2]
type PossibleSteps = (typeof possibleSteps)[number]

export default function App() {
  // Step 0: User is not connected
  // Step 1: User has connected wallet
  const [step, setStep] = useState<PossibleSteps>(0)
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

          {step === 1 && <WrapParent />}

          {step > 0 && (
            <Steps currentStep={step} totalSteps={possibleSteps.length} />
          )}
        </main>

        {/* Footer placeholder */}
        <div style={{ height: '3rem' }} />
      </Layout>
    </>
  )
}
